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
        Member member = memberRepository.findByIdIfExists(authMember.id());
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(studyId);
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByIdIfExists(progressId);
        validateProgressIsRelatedWith(pomodoroProgress, member, pomodoroRoom);
        return PomodoroProgressResponse.from(pomodoroProgress);
    }

    public PomodoroProgressesResponse findPomodoroProgressWithFilter(
            AuthMember authMember, Long studyId, Long memberId
    ) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(studyId);
        // TODO: 동적쿼리로 변경(memberId 유무에 따른 분기처리)
        if (Objects.isNull(memberId)) {
            return getPomodoroProgressesResponseWithoutMemberFilter(pomodoroRoom);
        }
        Member member = memberRepository.findByIdIfExists(memberId);
        validateIsSameMemberId(authMember, memberId);
        return getPomodoroProgressesResponseWithMemberFilter(pomodoroRoom, member);
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
        Member member = memberRepository.findByIdIfExists(authMember.id());
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByIdIfExists(progressId);
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(studyId);

        validateProgressIsRelatedWith(pomodoroProgress, member, pomodoroRoom);
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
            PomodoroProgress pomodoroProgress, Member member, PomodoroRoom pomodoroRoom
    ) {
        if (!pomodoroProgress.isOwnedBy(member)) {
            throw new AuthorizationException();
        }
        if (pomodoroProgress.isNotIncludedIn(pomodoroRoom)) {
            throw new ProgressNotBelongToRoomException();
        }
    }
}
