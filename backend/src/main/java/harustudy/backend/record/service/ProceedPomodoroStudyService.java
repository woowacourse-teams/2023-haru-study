package harustudy.backend.record.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroRecordNotFound;
import harustudy.backend.common.EntityNotFoundException.StudyNotFound;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.exception.InvalidProgressException.UnavailableToProceed;
import harustudy.backend.progress.exception.StudyProgressException;
import harustudy.backend.progress.repository.MemberProgressRepository;
import harustudy.backend.record.domain.PomodoroRecord;
import harustudy.backend.record.dto.MemberContentResponse;
import harustudy.backend.record.dto.MemberContentResponses;
import harustudy.backend.record.repository.MemberRecordRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ProceedPomodoroStudyService {

    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;
    private final MemberProgressRepository<PomodoroProgress> memberProgressRepository;
    private final MemberRecordRepository<PomodoroRecord> memberRecordRepository;

    public void writePlan(Long studyId, Long memberId, Map<String, String> plan) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, memberId);
        PomodoroRecord recentRecord = findRecordWithSameCycle(pomodoroProgress);
        validateProgressIsPlanning(pomodoroProgress);
        pomodoroProgress.proceed();
        recentRecord.changePlan(plan);
    }

    private void validateProgressIsPlanning(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotPlanning()) {
            throw new StudyProgressException();
        }
    }

    public void proceedToRetrospect(Long studyId, Long memberId) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, memberId);
        validateProgressIsStudying(pomodoroProgress);
        pomodoroProgress.proceed();
    }

    private void validateProgressIsStudying(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotStudying()) {
            throw new UnavailableToProceed();
        }
    }

    public MemberContentResponses findMemberContent(Long studyId, Long memberId) {
        Study study = studyRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByStudyAndMember(
                        study, member)
                .orElseThrow(IllegalArgumentException::new);

        List<PomodoroRecord> pomodoroRecords = pomodoroProgress.getPomodoroRecords();

        List<MemberContentResponse> memberContentResponses = pomodoroRecords.stream()
                .map(record -> new MemberContentResponse(record.getCycle(), record.getPlan(),
                        record.getRetrospect()))
                .toList();

        return new MemberContentResponses(memberContentResponses);
    }

    // TODO: 나중에 ID 반환할지 말지 고민해보기
    public void writeRetrospect(Long studyId, Long memberId, Map<String, String> retrospect) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, memberId);
        PomodoroRecord recentRecord = findRecordWithSameCycle(pomodoroProgress);
        validateProgressIsRetrospect(pomodoroProgress);
        validateIsPlanFilled(recentRecord);
        pomodoroProgress.proceed();
        recentRecord.changeRetrospect(retrospect);
    }

    private PomodoroRecord findRecordWithSameCycle(PomodoroProgress pomodoroProgress) {
        List<PomodoroRecord> pomodoroRecords = memberRecordRepository.findByMemberProgress(
                pomodoroProgress);

        return pomodoroRecords.stream()
                .filter(pomodoroRecord -> pomodoroRecord.hasSameCycleWith(pomodoroProgress))
                .findAny()
                .orElseThrow(PomodoroRecordNotFound::new);
    }

    private PomodoroProgress findPomodoroProgressFrom(Long studyId, Long memberId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(StudyNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);
        return memberProgressRepository.findByStudyAndMember(study, member)
                .orElseThrow(PomodoroProgressNotFound::new);
    }

    private void validateProgressIsRetrospect(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotRetrospect()) {
            throw new UnavailableToProceed(); // TODO: 예외 세분화
        }
    }

    private void validateIsPlanFilled(PomodoroRecord recentRecord) {
        if (recentRecord.getPlan().isEmpty()) {
            throw new StudyProgressException();
        }
    }
}
