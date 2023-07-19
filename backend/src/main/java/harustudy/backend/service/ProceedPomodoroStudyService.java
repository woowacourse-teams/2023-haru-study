package harustudy.backend.service;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.PomodoroRecord;
import harustudy.backend.entity.Study;
import harustudy.backend.exception.EntityNotFoundException.MemberNotFound;
import harustudy.backend.exception.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.exception.EntityNotFoundException.StudyNotFound;
import harustudy.backend.exception.InvalidProgressException.UnavailableToProceed;
import harustudy.backend.exception.StudyProgressException;
import harustudy.backend.repository.MemberProgressRepository;
import harustudy.backend.repository.MemberRecordRepository;
import harustudy.backend.repository.MemberRepository;
import harustudy.backend.repository.StudyRepository;
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

    // TODO: 나중에 ID 반환할지 말지 고민해보기
    public void writeRetrospect(Long studyId, Long memberId, Map<String, String> retrospect) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, memberId);
        List<PomodoroRecord> pomodoroRecords = memberRecordRepository.findByMemberProgress(
                pomodoroProgress);

        PomodoroRecord recentRecord = pomodoroRecords.stream()
                .filter(pomodoroRecord -> pomodoroRecord.hasSameCycleWith(pomodoroProgress))
                .findAny()
                .orElseThrow();
        validateProgressIsRetrospect(pomodoroProgress);
        validateIsPlanFilled(recentRecord);
        pomodoroProgress.proceed();
        recentRecord.changeRetrospect(retrospect);
    }

    private void validateProgressIsRetrospect(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isRetrospect()) {
            throw new UnavailableToProceed(); // TODO: 예외 세분화
        }
    }

    private PomodoroProgress findPomodoroProgressFrom(Long studyId, Long memberId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(StudyNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);
        return memberProgressRepository.findByStudyAndMember(study, member)
                .orElseThrow(PomodoroProgressNotFound::new);
    }

    private void validateIsPlanFilled(PomodoroRecord recentRecord) {
        if (recentRecord.getPlan().isEmpty()) {
            throw new StudyProgressException();
        }
    }
}
