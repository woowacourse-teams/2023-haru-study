package harustudy.backend.content.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroRecordNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.content.controller.domain.PomodoroContent;
import harustudy.backend.content.dto.PomodoroContentResponse;
import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.content.repository.PomodoroContentRepository;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.exception.InvalidPomodoroProgressException.UnavailableToProceed;
import harustudy.backend.progress.exception.StudyPomodoroProgressException;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroContentServiceV2 {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final MemberRepository memberRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final PomodoroContentRepository pomodoroContentRepository;

    public void writePlan(Long roomId, WritePlanRequest request) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(roomId, request.memberId());
        PomodoroContent recentContent = findContentWithSameCycle(pomodoroProgress);
        validateProgressIsPlanning(pomodoroProgress);
        recentContent.changePlan(request.plan());
    }

    private void validateProgressIsPlanning(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotPlanning()) {
            throw new StudyPomodoroProgressException();
        }
    }

    private PomodoroContent findContentWithSameCycle(PomodoroProgress pomodoroProgress) {
        List<PomodoroContent> pomodoroContents = pomodoroContentRepository.findByPomodoroProgress(
                pomodoroProgress);

        return pomodoroContents.stream()
                .filter(pomodoroContent -> pomodoroContent.hasSameCycleWith(pomodoroProgress))
                .findAny()
                .orElseThrow(PomodoroRecordNotFound::new);
    }

    private PomodoroProgress findPomodoroProgressFrom(Long roomId, Long memberId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);
        return pomodoroProgressRepository.findByPomodoroRoomAndMember(pomodoroRoom, member)
                .orElseThrow(PomodoroProgressNotFound::new);
    }

    public void writeRetrospect(Long roomId, WriteRetrospectRequest request) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(roomId, request.memberId());
        PomodoroContent recentContent = findContentWithSameCycle(pomodoroProgress);
        validateProgressIsRetrospect(pomodoroProgress);
        validateIsPlanFilled(recentContent);
        recentContent.changeRetrospect(request.retrospect());
    }

    private void validateProgressIsRetrospect(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotRetrospect()) {
            throw new UnavailableToProceed(); // TODO: 예외 세분화
        }
    }

    private void validateIsPlanFilled(PomodoroContent recentContent) {
        if (recentContent.getPlan().isEmpty()) {
            throw new StudyPomodoroProgressException();
        }
    }

    public PomodoroContentsResponse findMemberContent(Long roomId, Long memberId) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(roomId, memberId);
        List<PomodoroContent> pomodoroContents = pomodoroProgress.getPomodoroContents();
        List<PomodoroContentResponse> pomodoroContentResponses = pomodoroContents.stream()
                .map(PomodoroContentResponse::from)
                .toList();
        return PomodoroContentsResponse.from(pomodoroContentResponses);
    }
}
