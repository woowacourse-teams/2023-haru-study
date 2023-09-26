package harustudy.backend.view.service;

import harustudy.backend.participant.domain.Step;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.ProgressResponse;
import harustudy.backend.view.dto.WaitingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PollingService {

    private final StudyRepository studyRepository;

    public WaitingResponse pollWaiting(Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        return WaitingResponse.of(study, study.getParticipants());
    }

    public ProgressResponse pollProgress(Long studyId) {
        Step step = studyRepository.findStepById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        return ProgressResponse.from(step);
    }
    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;

    public SubmittersResponse findSubmitters(Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        List<Participant> participants = participantRepository.findByStudy(study);
        return generateSubmitterResponses(study, participants);
    }

    private SubmittersResponse generateSubmitterResponses(Study study, List<Participant> participants) {
        List<SubmitterResponse> submitterResponses = new ArrayList<>();

        for (Participant participant : participants) {
            Content currentCycleContent = extractCurrentCycleContent(study, participant);

            submitterResponses.add(SubmitterResponse.of(
                    participant.getNickname(),
                    SubmitterCheckingStrategy.isSubmitted(study.getStep(), currentCycleContent)));
        }
        return SubmittersResponse.from(submitterResponses);
    }

    private Content extractCurrentCycleContent(Study study, Participant participant) {
        return participant.getContents().stream()
                .filter(content -> content.hasSameCycleWith(study))
                .findFirst()
                .orElseThrow(CurrentCycleContentNotExistsException::new);
    }
}
