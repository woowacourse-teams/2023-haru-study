package harustudy.backend.progress.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.StudyMemberMetaDataResponse;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.dto.MemberDto;
import harustudy.backend.progress.repository.MemberProgressRepository;
import harustudy.backend.record.dto.CurrentCyclePlanResponse;
import harustudy.backend.study.domain.Pomodoro;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.dto.StudyMetadataResponse;
import harustudy.backend.study.repository.StudyRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class PomodoroProgressService {

    private final MemberProgressRepository<PomodoroProgress> memberProgressRepository;
    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;

    public CurrentCyclePlanResponse findCurrentCyclePlan(Long studyId, Long memberId,
            Integer cycle) {
        Study study = studyRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyAndMember(
                        study, member)
                .orElseThrow(IllegalArgumentException::new);

        return new CurrentCyclePlanResponse(
                pomodoroProgress.findPomodoroRecordByCycle(cycle).getPlan());
    }

    public StudyMemberMetaDataResponse findMemberMetaData(Long studyId, Long memberId) {
        Study study = studyRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyAndMember(
                        study, member)
                .orElseThrow(IllegalArgumentException::new);

        Pomodoro pomodoro = (Pomodoro) pomodoroProgress.getStudy();

        return new StudyMemberMetaDataResponse(pomodoro.getName(), pomodoro.getTotalCycle(),
                pomodoroProgress.getCurrentCycle(),
                pomodoro.getTimePerCycle(), pomodoroProgress.getStudyStatus());
    }

    public StudyMetadataResponse findStudyMetadata(Long studyId) {
        Study study = studyRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        List<PomodoroProgress> pomodoroProgresses = memberProgressRepository.findByStudy(study);

        if (pomodoroProgresses.isEmpty()) {
            throw new IllegalArgumentException();
        }

        List<MemberDto> members = pomodoroProgresses.stream()
                .map(pomodoroProgress -> new MemberDto(
                        pomodoroProgress.getMember().getId(),
                        pomodoroProgress.getMember().getNickname()))
                .toList();

        Pomodoro pomodoro = (Pomodoro) study;

        return new StudyMetadataResponse(
                pomodoro.getName(),
                pomodoro.getTotalCycle(),
                pomodoro.getTimePerCycle(),
                members
        );
    }
}
