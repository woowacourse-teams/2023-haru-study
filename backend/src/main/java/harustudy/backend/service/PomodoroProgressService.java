package harustudy.backend.service;

import harustudy.backend.dto.MemberContentResponse;
import harustudy.backend.dto.MemberDto;
import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberContentResponses;
import harustudy.backend.dto.response.MemberStudyMetaDataResponse;
import harustudy.backend.dto.response.StudyMetadataResponse;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.PomodoroRecord;
import harustudy.backend.repository.MemberProgressRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class PomodoroProgressService {

    private final MemberProgressRepository<PomodoroProgress> memberProgressRepository;

    public CurrentCyclePlanResponse findCurrentCyclePlan(Integer cycle, Long studyId,
            Long memberId) {
        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyIdAndMemberId(
                        studyId, memberId)
                .orElseThrow(IllegalArgumentException::new);

        return new CurrentCyclePlanResponse(
                pomodoroProgress.findPomodoroRecordByCycle(cycle).getPlan());
    }

    public MemberStudyMetaDataResponse findMemberMetaData(Long studyId, Long memberId) {
        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyIdAndMemberId(
                        studyId, memberId)
                .orElseThrow(IllegalArgumentException::new);

        Pomodoro pomodoro = (Pomodoro) pomodoroProgress.getStudy();

        return new MemberStudyMetaDataResponse(pomodoro.getName(), pomodoro.getTotalCycle(),
                pomodoroProgress.getCurrentCycle(),
                pomodoro.getTimePerCycle(), pomodoroProgress.getStudyStatus());
    }

    public StudyMetadataResponse findStudyMetadata(Long studyId) {
        List<PomodoroProgress> pomodoroProgresses = memberProgressRepository.findByStudyId(studyId);

        if (pomodoroProgresses.size() == 0) {
            throw new IllegalArgumentException();
        }

        List<MemberDto> members = pomodoroProgresses.stream()
                .map(pomodoroProgress -> new MemberDto(
                        pomodoroProgress.getMember().getId(),
                        pomodoroProgress.getMember().getNickname()))
                .toList();

        Pomodoro pomodoro = (Pomodoro) pomodoroProgresses.get(0).getStudy();

        return new StudyMetadataResponse(
                pomodoro.getName(),
                pomodoro.getTotalCycle(),
                pomodoro.getTimePerCycle(),
                members
        );
    }

    public MemberContentResponses findMemberContent(Long studyId, Long memberId) {
        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyIdAndMemberId(
                        studyId, memberId)
                .orElseThrow(IllegalArgumentException::new);

        List<PomodoroRecord> pomodoroRecords = pomodoroProgress.getPomodoroRecords();

        List<MemberContentResponse> memberContentResponses = pomodoroRecords.stream()
                .map(record -> new MemberContentResponse(record.getCycle(), record.getPlan(),
                        record.getRetrospect()))
                .toList();

        return new MemberContentResponses(memberContentResponses);
    }
}
