package harustudy.backend.content.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroRecordNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.dto.MemberContentResponse;
import harustudy.backend.content.dto.MemberContentResponses;
import harustudy.backend.content.repository.ContentRepository;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.exception.InvalidProgressException.UnavailableToProceed;
import harustudy.backend.progress.exception.StudyProgressException;
import harustudy.backend.progress.repository.MemberProgressRepository;
import harustudy.backend.room.domain.Room;
import harustudy.backend.room.repository.RoomRepository;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ContentService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;
    private final MemberProgressRepository<PomodoroProgress> memberProgressRepository;
    private final ContentRepository<PomodoroContent> contentRepository;

    public Map<String, String> findCurrentCyclePlan(Long studyId, Long memberId,
            Integer cycle) {
        Room room = roomRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByRoomAndMember(
                        room, member)
                .orElseThrow(IllegalArgumentException::new);

        return pomodoroProgress.findPomodoroRecordByCycle(cycle).getPlan();
    }

    public void writePlan(Long studyId, Long memberId, Map<String, String> plan) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, memberId);
        PomodoroContent recentRecord = findRecordWithSameCycle(pomodoroProgress);
        // 생성 새로운거 만들어서 Repository에 저장
        validateProgressIsPlanning(pomodoroProgress);
        pomodoroProgress.proceed();
        recentRecord.changePlan(plan);
    }

    private void validateProgressIsPlanning(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotPlanning()) {
            throw new StudyProgressException();
        }
    }

    public MemberContentResponses findMemberContent(Long studyId, Long memberId) {
        Room room = roomRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByRoomAndMember(
                        room, member)
                .orElseThrow(IllegalArgumentException::new);

        List<PomodoroContent> pomodoroRecords = pomodoroProgress.getPomodoroRecords();

        List<MemberContentResponse> memberContentResponses = pomodoroRecords.stream()
                .map(record -> new MemberContentResponse(record.getCycle(), record.getPlan(),
                        record.getRetrospect()))
                .toList();

        return new MemberContentResponses(memberContentResponses);
    }

    // TODO: 나중에 ID 반환할지 말지 고민해보기
    public void writeRetrospect(Long studyId, Long memberId, Map<String, String> retrospect) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, memberId);
        PomodoroContent recentRecord = findRecordWithSameCycle(pomodoroProgress);
        validateProgressIsRetrospect(pomodoroProgress);
        validateIsPlanFilled(recentRecord);
        pomodoroProgress.proceed();
        recentRecord.changeRetrospect(retrospect);
    }

    private PomodoroContent findRecordWithSameCycle(PomodoroProgress pomodoroProgress) {
        List<PomodoroContent> pomodoroRecords = contentRepository.findByMemberProgress(
                pomodoroProgress);

        return pomodoroRecords.stream()
                .filter(pomodoroRecord -> pomodoroRecord.hasSameCycleWith(pomodoroProgress))
                .findAny()
                .orElseThrow(PomodoroRecordNotFound::new);
    }

    private PomodoroProgress findPomodoroProgressFrom(Long studyId, Long memberId) {
        Room room = roomRepository.findById(studyId)
                .orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);
        return memberProgressRepository.findByRoomAndMember(room, member)
                .orElseThrow(PomodoroProgressNotFound::new);
    }

    private void validateProgressIsRetrospect(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotRetrospect()) {
            throw new UnavailableToProceed(); // TODO: 예외 세분화
        }
    }

    private void validateIsPlanFilled(PomodoroContent recentRecord) {
        if (recentRecord.getPlan().isEmpty()) {
            throw new StudyProgressException();
        }
    }
}
