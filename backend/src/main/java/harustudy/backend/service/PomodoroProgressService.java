package harustudy.backend.service;

import harustudy.backend.dto.MemberContentResponse;
import harustudy.backend.dto.MemberDto;
import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberContentResponses;
import harustudy.backend.dto.response.StudyMemberMetaDataResponse;
import harustudy.backend.dto.response.StudyMetadataResponse;
import harustudy.backend.entity.Member;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.PomodoroRecord;
import harustudy.backend.entity.Study;
import harustudy.backend.repository.MemberProgressRepository;
import harustudy.backend.repository.MemberRepository;
import harustudy.backend.repository.StudyRepository;
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

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyIdAndMemberId(
                        study, member)
                .orElseThrow(IllegalArgumentException::new);

        return new CurrentCyclePlanResponse(
                pomodoroProgress.findPomodoroRecordByCycle(cycle).getPlan());
    }

    public StudyMemberMetaDataResponse findMemberMetaData(Long studyId, Long memberId) {
        Study study = studyRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyIdAndMemberId(
                        study, member)
                .orElseThrow(IllegalArgumentException::new);

        Pomodoro pomodoro = (Pomodoro) pomodoroProgress.getStudy();

        return new StudyMemberMetaDataResponse(pomodoro.getName(), pomodoro.getTotalCycle(),
                pomodoroProgress.getCurrentCycle(),
                pomodoro.getTimePerCycle(), pomodoroProgress.getStudyStatus());
    }

    public StudyMetadataResponse findStudyMetadata(Long studyId) {
        Study study = studyRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        List<PomodoroProgress> pomodoroProgresses = memberProgressRepository.findByStudyId(study);

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

    public MemberContentResponses findMemberContent(Long studyId, Long memberId) {
        Study study = studyRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyIdAndMemberId(
                        study, member)
                .orElseThrow(IllegalArgumentException::new);

        List<PomodoroRecord> pomodoroRecords = pomodoroProgress.getPomodoroRecords();

        List<MemberContentResponse> memberContentResponses = pomodoroRecords.stream()
                .map(record -> new MemberContentResponse(record.getCycle(), record.getPlan(),
                        record.getRetrospect()))
                .toList();

        return new MemberContentResponses(memberContentResponses);
    }
}
