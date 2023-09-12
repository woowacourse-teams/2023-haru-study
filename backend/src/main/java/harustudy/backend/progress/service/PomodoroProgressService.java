package harustudy.backend.progress.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.dto.ParticipateStudyRequest;
import harustudy.backend.progress.dto.PomodoroProgressResponse;
import harustudy.backend.progress.dto.PomodoroProgressesResponse;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.ProgressNotBelongToStudyException;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.study.domain.PomodoroStudy;
import harustudy.backend.study.repository.PomodoroStudyRepository;
import jakarta.annotation.Nullable;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroProgressService {

    private final MemberRepository memberRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final PomodoroStudyRepository pomodoroStudyRepository;

    @Transactional(readOnly = true)
    public PomodoroProgressResponse findPomodoroProgress(
            AuthMember authMember, Long studyId, Long progressId
    ) {
        PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findByIdIfExists(studyId);
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByIdIfExists(progressId);
        validateProgressIsRelatedWith(pomodoroProgress, authMember, pomodoroStudy);
        return PomodoroProgressResponse.from(pomodoroProgress);
    }

    // TODO: 임시용이므로 이후에 제거
    public PomodoroProgressesResponse tempFindPomodoroProgressWithFilter(
            AuthMember authMember, Long studyId, Long memberId
    ) {
        PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findByIdIfExists(studyId);
        if (Objects.isNull(memberId)) {
            validateEverParticipated(authMember, pomodoroStudy);
            return getPomodoroProgressesResponseWithoutMemberFilter(pomodoroStudy);
        }
        Member member = memberRepository.findByIdIfExists(memberId);
        validateIsSameMemberId(authMember, memberId);
        return tempGetPomodoroProgressesResponseWithMemberFilter(pomodoroStudy, member);
    }

    // TODO: 임시용이므로 이후에 제거
    private PomodoroProgressesResponse tempGetPomodoroProgressesResponseWithMemberFilter(
            PomodoroStudy pomodoroStudy, Member member) {
        return pomodoroProgressRepository.findByPomodoroStudyAndMember(pomodoroStudy, member)
                .map(PomodoroProgressResponse::from)
                .map(response -> PomodoroProgressesResponse.from(List.of(response)))
                .orElseGet(() -> PomodoroProgressesResponse.from(null));
    }

    // TODO: 동적쿼리로 변경(memberId 유무에 따른 분기처리)
    @Transactional(readOnly = true)
    public PomodoroProgressesResponse findPomodoroProgressWithFilter(
            AuthMember authMember, Long studyId, @Nullable Long memberId
    ) {
        PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findByIdIfExists(studyId);
        if (Objects.isNull(memberId)) {
            validateEverParticipated(authMember, pomodoroStudy);
            return getPomodoroProgressesResponseWithoutMemberFilter(pomodoroStudy);
        }
        Member member = memberRepository.findByIdIfExists(memberId);
        validateIsSameMemberId(authMember, memberId);
        return getPomodoroProgressesResponseWithMemberFilter(pomodoroStudy, member);
    }

    private void validateEverParticipated(AuthMember authMember, PomodoroStudy pomodoroStudy) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        pomodoroProgressRepository.findByPomodoroStudyAndMember(pomodoroStudy, member)
                .orElseThrow(AuthorizationException::new);
    }

    private PomodoroProgressesResponse getPomodoroProgressesResponseWithoutMemberFilter(
            PomodoroStudy pomodoroStudy
    ) {
        List<PomodoroProgressResponse> responses =
                pomodoroProgressRepository.findByPomodoroStudy(pomodoroStudy)
                        .stream()
                        .map(PomodoroProgressResponse::from)
                        .toList();
        return PomodoroProgressesResponse.from(responses);
    }

    private PomodoroProgressesResponse getPomodoroProgressesResponseWithMemberFilter(
            PomodoroStudy pomodoroStudy, Member member
    ) {
        PomodoroProgressResponse response =
                pomodoroProgressRepository.findByPomodoroStudyAndMember(pomodoroStudy, member)
                        .map(PomodoroProgressResponse::from)
                        .orElseThrow(PomodoroProgressNotFoundException::new);
        return PomodoroProgressesResponse.from(List.of(response));
    }

    public void proceed(AuthMember authMember, Long studyId, Long progressId) {
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByIdIfExists(progressId);
        PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findByIdIfExists(studyId);

        validateProgressIsRelatedWith(pomodoroProgress, authMember, pomodoroStudy);
        pomodoroProgress.proceed();
    }

    public Long participateStudy(AuthMember authMember, Long studyId,
            ParticipateStudyRequest request) {
        Member member = memberRepository.findByIdIfExists(request.memberId());
        validateIsSameMemberId(authMember, request.memberId());
        PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findByIdIfExists(studyId);
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroStudy, member,
                request.nickname());
        pomodoroProgress.generateContents(pomodoroStudy.getTotalCycle());
        PomodoroProgress saved = pomodoroProgressRepository.save(pomodoroProgress);
        return saved.getId();
    }

    private void validateIsSameMemberId(AuthMember authMember, Long memberId) {
        if (!(authMember.id().equals(memberId))) {
            throw new AuthorizationException();
        }
    }

    private void validateProgressIsRelatedWith(
            PomodoroProgress pomodoroProgress, AuthMember authMember, PomodoroStudy pomodoroStudy
    ) {
        validateMemberOwns(pomodoroProgress, authMember);
        validateProgressIsIncludedIn(pomodoroStudy, pomodoroProgress);
    }

    private void validateMemberOwns(PomodoroProgress pomodoroProgress, AuthMember authMember) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        if (!pomodoroProgress.isOwnedBy(member)) {
            throw new AuthorizationException();
        }
    }

    private void validateProgressIsIncludedIn(PomodoroStudy pomodoroStudy,
            PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotIncludedIn(pomodoroStudy)) {
            throw new ProgressNotBelongToStudyException();
        }
    }

    public void deleteProgress(AuthMember authMember, Long studyId, Long progressId) {
        PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findByIdIfExists(studyId);
        validateEverParticipated(authMember, pomodoroStudy);
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByIdIfExists(progressId);
        validateProgressIsRelatedWith(pomodoroProgress, authMember, pomodoroStudy);
        pomodoroProgressRepository.delete(pomodoroProgress);
    }
}
