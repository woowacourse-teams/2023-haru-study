package harustudy.backend.service;

import harustudy.backend.dto.MemberDto;
import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberStudyMetaDataResponse;
import harustudy.backend.dto.response.StudyMetadataResponse;
import harustudy.backend.entity.Member;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
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
                .orElseThrow();

        return new CurrentCyclePlanResponse(
                pomodoroProgress.findPomodoroRecordByCycle(cycle).getPlan());
    }

    public MemberStudyMetaDataResponse findMemberMetaDataByStudyIdAndMemberId(Long memberId,
            Long studyId) {
        PomodoroProgress pomodoroProgress = memberProgressRepository.findByMemberIdWithStudyId(
                        memberId, studyId)
                .orElseThrow();

        Pomodoro study = (Pomodoro) pomodoroProgress.getStudy();

        return new MemberStudyMetaDataResponse(study.getName(), study.getTotalCycle(),
                pomodoroProgress.getCurrentCycle(),
                study.getTimePerCycle(), pomodoroProgress.getStudyStatus());
    }

    public StudyMetadataResponse findStudyMetadataByStudyId(Long studyId) {
        List<PomodoroProgress> pomodoroProgresses = memberProgressRepository.findByStudyId(studyId);

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
}
