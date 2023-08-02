package harustudy.backend.content.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroRecordNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.dto.PomodoroContentResponse;
import harustudy.backend.content.dto.PomodoroContentsResponse;
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
import java.util.Map;
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

    public Map<String, String> findCurrentCyclePlan(Long roomId, Long memberId,
                                                    Integer cycle) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByPomodoroRoomAndMember(
                        pomodoroRoom, member)
                .orElseThrow(IllegalArgumentException::new);

        return pomodoroProgress.findPomodoroRecordByCycle(cycle).getPlan();
    }

    public void writePlan(Long roomId, Long memberId, Map<String, String> plan) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(roomId, memberId);
        PomodoroContent recentRecord = findRecordWithSameCycle(pomodoroProgress);
        validateProgressIsPlanning(pomodoroProgress);
        pomodoroProgress.proceed();
        recentRecord.changePlan(plan);
    }

    private void validateProgressIsPlanning(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotPlanning()) {
            throw new StudyPomodoroProgressException();
        }
    }

    public PomodoroContentsResponse findMemberContent(Long roomId, Long memberId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByPomodoroRoomAndMember(
                        pomodoroRoom, member)
                .orElseThrow(IllegalArgumentException::new);

        List<PomodoroContent> pomodoroRecords = pomodoroProgress.getPomodoroRecords();

        List<PomodoroContentResponse> pomodoroContentRespons = pomodoroRecords.stream()
                .map(record -> new PomodoroContentResponse(record.getCycle(), record.getPlan(),
                        record.getRetrospect()))
                .toList();

        return new PomodoroContentsResponse(pomodoroContentRespons);
    }

    public void writeRetrospect(Long roomId, Long memberId, Map<String, String> retrospect) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(roomId, memberId);
        PomodoroContent recentRecord = findRecordWithSameCycle(pomodoroProgress);
        validateProgressIsRetrospect(pomodoroProgress);
        validateIsPlanFilled(recentRecord);
        recentRecord.changeRetrospect(retrospect);
        int totalCycle = pomodoroProgress.getPomodoroRoom().getTotalCycle();
        if (pomodoroProgress.getCurrentCycle().equals(totalCycle)) {
            pomodoroProgress.setDone();
            return;
        }
        pomodoroProgress.proceed();
    }

    private PomodoroContent findRecordWithSameCycle(PomodoroProgress pomodoroProgress) {
        List<PomodoroContent> pomodoroRecords = pomodoroContentRepository.findByPomodoroProgress(
                pomodoroProgress);

        return pomodoroRecords.stream()
                .filter(pomodoroRecord -> pomodoroRecord.hasSameCycleWith(pomodoroProgress))
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

    private void validateProgressIsRetrospect(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotRetrospect()) {
            throw new UnavailableToProceed(); // TODO: 예외 세분화
        }
    }

    private void validateIsPlanFilled(PomodoroContent recentRecord) {
        if (recentRecord.getPlan().isEmpty()) {
            throw new StudyPomodoroProgressException();
        }
    }
}
