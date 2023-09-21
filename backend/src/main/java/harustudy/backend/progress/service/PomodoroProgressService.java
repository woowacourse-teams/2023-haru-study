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
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import jakarta.annotation.Nullable;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PomodoroProgressService {

    private final MemberRepository memberRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final PomodoroRoomRepository pomodoroRoomRepository;

    public PomodoroProgressResponse findPomodoroProgress(
            AuthMember authMember, Long studyId, Long progressId
    ) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(studyId);
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByIdIfExists(progressId);
        validateProgressIsRelatedWith(pomodoroProgress, authMember, pomodoroRoom);
        return PomodoroProgressResponse.from(pomodoroProgress);
    }

    // TODO: 동적쿼리로 변경(memberId 유무에 따른 분기처리)
    public PomodoroProgressesResponse findPomodoroProgressWithFilter(
            AuthMember authMember, Long studyId, @Nullable Long memberId
    ) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(studyId);
        if (Objects.isNull(memberId)) {
            validateEverParticipated(authMember, pomodoroRoom);
            return getPomodoroProgressesResponseWithoutMemberFilter(pomodoroRoom);
        }
        Member member = memberRepository.findByIdIfExists(memberId);
        validateIsSameMemberId(authMember, memberId);
        return getPomodoroProgressesResponseWithMemberFilter(pomodoroRoom, member);
    }

    private void validateEverParticipated(AuthMember authMember, PomodoroRoom pomodoroRoom) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        pomodoroProgressRepository.findByPomodoroRoomAndMember(pomodoroRoom, member)
                .orElseThrow(AuthorizationException::new);
    }

    private PomodoroProgressesResponse getPomodoroProgressesResponseWithoutMemberFilter(
            PomodoroRoom pomodoroRoom
    ) {
        List<PomodoroProgressResponse> responses =
                pomodoroProgressRepository.findByPomodoroRoom(pomodoroRoom)
                        .stream()
                        .map(PomodoroProgressResponse::from)
                        .collect(Collectors.toList());
        return PomodoroProgressesResponse.from(responses);
    }

    private PomodoroProgressesResponse getPomodoroProgressesResponseWithMemberFilter(
            PomodoroRoom pomodoroRoom, Member member
    ) {
        PomodoroProgressResponse response =
                pomodoroProgressRepository.findByPomodoroRoomAndMember(pomodoroRoom, member)
                        .map(PomodoroProgressResponse::from)
                        .orElseThrow(PomodoroProgressNotFoundException::new);
        return PomodoroProgressesResponse.from(List.of(response));
    }

    public void proceed(AuthMember authMember, Long studyId, Long progressId) {
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByIdIfExists(progressId);
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(studyId);

        validateProgressIsRelatedWith(pomodoroProgress, authMember, pomodoroRoom);
        pomodoroProgress.proceed();
    }

    public Long participateStudy(AuthMember authMember, Long studyId, ParticipateStudyRequest request) {
        Member member = memberRepository.findByIdIfExists(request.memberId());
        validateIsSameMemberId(authMember, request.memberId());
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(studyId);
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, request.nickname());
        pomodoroProgress.generateContents(pomodoroRoom.getTotalCycle());
        PomodoroProgress saved = pomodoroProgressRepository.save(pomodoroProgress);
        return saved.getId();
    }

    private void validateIsSameMemberId(AuthMember authMember, Long memberId) {
        if (!(authMember.id().equals(memberId))) {
            throw new AuthorizationException();
        }
    }

    private void validateProgressIsRelatedWith(
            PomodoroProgress pomodoroProgress, AuthMember authMember, PomodoroRoom pomodoroRoom
    ) {
        validateMemberOwns(pomodoroProgress, authMember);
        validateProgressIsIncludedIn(pomodoroRoom, pomodoroProgress);
    }

    private void validateMemberOwns(PomodoroProgress pomodoroProgress, AuthMember authMember) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        if (!pomodoroProgress.isOwnedBy(member)) {
            throw new AuthorizationException();
        }
    }

    private void validateProgressIsIncludedIn(PomodoroRoom pomodoroRoom,
            PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotIncludedIn(pomodoroRoom)) {
            throw new ProgressNotBelongToRoomException();
        }
    }

    public void deleteProgress(AuthMember authMember, Long studyId, Long progressId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(studyId);
        validateEverParticipated(authMember, pomodoroRoom);
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByIdIfExists(progressId);
        validateProgressIsRelatedWith(pomodoroProgress, authMember, pomodoroRoom);
        pomodoroProgressRepository.delete(pomodoroProgress);
    }
}
