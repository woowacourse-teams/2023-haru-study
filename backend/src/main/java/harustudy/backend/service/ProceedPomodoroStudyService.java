package harustudy.backend.service;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.Study;
import harustudy.backend.exception.EntityNotFoundException.MemberNotFound;
import harustudy.backend.exception.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.exception.EntityNotFoundException.StudyNotFound;
import harustudy.backend.exception.InvalidProgressException.UnavailableToProceed;
import harustudy.backend.repository.MemberProgressRepository;
import harustudy.backend.repository.MemberRepository;
import harustudy.backend.repository.StudyRepository;
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

    public void proceedToRetrospect(Long studyId, Long memberId) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, memberId);
        validateProgressIsStudying(pomodoroProgress);
        pomodoroProgress.proceedRetrospect();
    }

    private PomodoroProgress findPomodoroProgressFrom(Long studyId, Long memberId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(StudyNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);
        return memberProgressRepository.findByStudyAndMember(study, member)
                .orElseThrow(PomodoroProgressNotFound::new);
    }

    private void validateProgressIsStudying(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotStudying()) {
            throw new UnavailableToProceed();
        }
    }
}
