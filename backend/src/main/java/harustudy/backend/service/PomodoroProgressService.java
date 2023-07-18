package harustudy.backend.service;

import harustudy.backend.dto.MemberContentResponse;
import harustudy.backend.dto.MemberDto;
import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberContentResponses;
import harustudy.backend.dto.response.MemberStudyMetaDataResponse;
import harustudy.backend.dto.response.StudyMetadataResponse;
import harustudy.backend.entity.Member;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.PomodoroRecord;
import harustudy.backend.repository.MemberProgressRepository;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class PomodoroProgressService {

    private final MemberProgressRepository<PomodoroProgress> memberProgressRepository;

    public CurrentCyclePlanResponse findCurrentCyclePlanByStudyIdAndMemberIdAndCycle(Integer cycle,
            Long studyId,
            Long memberId) {
        PomodoroProgress pomodoroProgress = memberProgressRepository.findByMemberIdWithStudyId(
                        memberId, studyId)
                .orElseThrow(IllegalArgumentException::new);

        return new CurrentCyclePlanResponse(
                pomodoroProgress.findPomodoroRecordByCycle(cycle).getPlan());
    }

    public MemberStudyMetaDataResponse findMemberMetaDataByStudyIdAndMemberId(Long memberId,
            Long studyId) {
        PomodoroProgress pomodoroProgress = memberProgressRepository.findByMemberIdWithStudyId(
                        memberId, studyId)
                .orElseThrow(IllegalArgumentException::new);

        Pomodoro study = (Pomodoro) pomodoroProgress.getStudy();

        return new MemberStudyMetaDataResponse(study.getName(), study.getTotalCycle(),
                pomodoroProgress.getCurrentCycle(),
                study.getTimePerCycle(), pomodoroProgress.getStudyStatus());
    }

    public StudyMetadataResponse findStudyMetadataByStudyId(Long studyId) {
        List<PomodoroProgress> pomodoroProgresses = memberProgressRepository.findByStudyId(studyId);

        if (pomodoroProgresses.size() == 0) {
            throw new IllegalArgumentException();
        }

        List<MemberDto> members = new ArrayList<>();

        for (PomodoroProgress pomodoroProgress : pomodoroProgresses) {
            Member member = pomodoroProgress.getMember();
            members.add(new MemberDto(member.getId(), member.getNickname()));
        }

        Pomodoro pomodoro = (Pomodoro) pomodoroProgresses.get(0).getStudy();

        return new StudyMetadataResponse(
                pomodoro.getName(),
                pomodoro.getTotalCycle(),
                pomodoro.getTimePerCycle(),
                members
        );
    }

    public MemberContentResponses findMemberContentByStudyIdAndMemberId(Long studyId,
            Long memberId) {
        PomodoroProgress pomodoroProgress = memberProgressRepository.findByMemberIdWithStudyId(
                        memberId, studyId)
                .orElseThrow();

        List<PomodoroRecord> pomodoroRecords = pomodoroProgress.getPomodoroRecords();

        List<MemberContentResponse> memberContentResponses = pomodoroRecords.stream()
                .map(record -> new MemberContentResponse(record.getCycle(), record.getPlan(),
                        record.getRetrospect()))
                .toList();

        return new MemberContentResponses(memberContentResponses);
    }
}
