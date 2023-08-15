package harustudy.backend.content.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.dto.PomodoroContentResponse;
import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.exception.PomodoroContentNotFoundException;
import harustudy.backend.content.repository.PomodoroContentRepository;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressStatusException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.exception.RoomNotFoundException;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import jakarta.annotation.Nullable;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroContentService {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final MemberRepository memberRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final PomodoroContentRepository pomodoroContentRepository;

    public PomodoroContentsResponse findContentsWithFilter(
            AuthMember authMember, Long roomId, Long progressId, @Nullable Integer cycle
    ) {
        List<PomodoroProgress> pomodoroProgresses = getProgressesIfAuthorized(
                authMember, roomId);
        PomodoroProgress pomodoroProgress = filterSingleProgressById(
                pomodoroProgresses, progressId);

        List<PomodoroContent> pomodoroContents = pomodoroProgress.getPomodoroContents();
        if (Objects.isNull(cycle)) {
            return getPomodoroContentsResponseWithoutCycleFilter(pomodoroContents);
        }
        return getPomodoroContentsResponseWithCycleFilter(pomodoroContents, cycle);
    }

    private List<PomodoroProgress> getProgressesIfAuthorized(AuthMember authMember, Long roomId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findAllByPomodoroRoomFetchMember(
                pomodoroRoom);
        Member member = memberRepository.findByIdIfExists(authMember.id());
        if (isProgressNotRelatedToMember(pomodoroProgresses, member)) {
            throw new AuthorizationException();
        }
        return pomodoroProgresses;
    }

    private boolean isProgressNotRelatedToMember(List<PomodoroProgress> pomodoroProgresses,
            Member member) {
        return pomodoroProgresses.stream()
                .noneMatch(pomodoroProgress -> pomodoroProgress.isOwnedBy(member));
    }

    private PomodoroProgress filterSingleProgressById(
            List<PomodoroProgress> pomodoroProgresses, Long progressId) {
        return pomodoroProgresses.stream()
                .filter(progress -> progress.getId().equals(progressId))
                .findFirst()
                .orElseThrow(PomodoroProgressNotFoundException::new);
    }

    private PomodoroContentsResponse getPomodoroContentsResponseWithoutCycleFilter(List<PomodoroContent> pomodoroContents) {
        List<PomodoroContentResponse> pomodoroContentResponses = pomodoroContents.stream()
                .map(PomodoroContentResponse::from)
                .toList();
        return PomodoroContentsResponse.from(pomodoroContentResponses);
    }

    private PomodoroContentsResponse getPomodoroContentsResponseWithCycleFilter(
            List<PomodoroContent> pomodoroContents, Integer cycle) {
        List<PomodoroContentResponse> pomodoroContentResponses = pomodoroContents.stream()
                .filter(content -> content.getCycle().equals(cycle))
                .map(PomodoroContentResponse::from)
                .toList();
        return PomodoroContentsResponse.from(pomodoroContentResponses);
    }

    // TODO: 이제 progressId로 요청을 받으니 굳이 roomId 까지 받아야 하는지 의문
    public void writePlan(AuthMember authMember, Long roomId, WritePlanRequest request) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(roomId, request.progressId());
        if (!pomodoroProgress.isOwnedBy(member)) {
            throw new AuthorizationException();
        }
        validateProgressIsPlanning(pomodoroProgress);
        PomodoroContent recentContent = findContentWithSameCycle(pomodoroProgress);
        recentContent.changePlan(request.plan());
    }

    private PomodoroProgress findPomodoroProgressFrom(Long roomId, Long progressId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findById(progressId)
                .orElseThrow(PomodoroProgressNotFoundException::new);
        if (!pomodoroProgress.isProgressOf(pomodoroRoom)) {
            throw new ProgressNotBelongToRoomException();
        }
        return pomodoroProgress;
    }

    private void validateProgressIsPlanning(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotPlanning()) {
            throw new PomodoroProgressStatusException();
        }
    }

    private PomodoroContent findContentWithSameCycle(PomodoroProgress pomodoroProgress) {
        List<PomodoroContent> pomodoroContents = pomodoroContentRepository.findByPomodoroProgress(
                pomodoroProgress);

        return pomodoroContents.stream()
                .filter(pomodoroContent -> pomodoroContent.hasSameCycleWith(pomodoroProgress))
                .findAny()
                .orElseThrow(PomodoroContentNotFoundException::new);
    }

//
//    public void writePlan(Long roomId, WritePlanRequest request) {
//        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(roomId, request.memberId());
//        PomodoroContent recentContent = findContentWithSameCycle(pomodoroProgress);
//        validateProgressIsPlanning(pomodoroProgress);
//        recentContent.changePlan(request.plan());
//    }



//
//    public void writeRetrospect(Long roomId, WriteRetrospectRequest request) {
//        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(roomId, request.memberId());
//        PomodoroContent recentContent = findContentWithSameCycle(pomodoroProgress);
//        validateProgressIsRetrospect(pomodoroProgress);
//        validateIsPlanFilled(recentContent);
//        recentContent.changeRetrospect(request.retrospect());
//    }

//    private void validateProgressIsRetrospect(PomodoroProgress pomodoroProgress) {
//        if (pomodoroProgress.isNotRetrospect()) {
//            throw new PomodoroProgressStatusException();
//        }
//    }
//
//    private void validateIsPlanFilled(PomodoroContent recentContent) {
//        if (recentContent.hasEmptyPlan()) {
//            throw new PomodoroProgressStatusException();
//        }
//    }

}
