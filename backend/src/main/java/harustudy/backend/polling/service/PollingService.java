package harustudy.backend.polling.service;

import harustudy.backend.content.domain.Content;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.polling.dto.ProgressResponse;
import harustudy.backend.polling.dto.SubmitterResponse;
import harustudy.backend.polling.dto.SubmittersResponse;
import harustudy.backend.polling.dto.WaitingResponse;
import harustudy.backend.polling.exception.CurrentCycleContentNotExistsException;
import java.util.Collections;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PollingService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;

    public WaitingResponse pollWaiting(Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        if (doesHostExists(study.getParticipants())) {
            return WaitingResponse.of(study, study.getParticipants());
        }
        return WaitingResponse.of(study, Collections.emptyList());
    }

    public ProgressResponse pollProgress(Long studyId) {
        Step step = studyRepository.findStepById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        return ProgressResponse.from(step);
    }

    public SubmittersResponse findSubmitters(Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        List<Participant> participants = participantRepository.findByStudy(study);
        if (doesHostExists(participants)) {
            return generateSubmitterResponses(study, participants);
        }
        return generateEmptyResponse();
    }

    private boolean doesHostExists(List<Participant> participants) {
        return participants.stream()
                .anyMatch(Participant::getIsHost);
    }

    private boolean doesHostExists(List<Participant> participants) {
        return participants.stream()
                .anyMatch(Participant::getIsHost);
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

    private SubmittersResponse generateEmptyResponse() {
        return SubmittersResponse.from(Collections.emptyList());
    }

    private Content extractCurrentCycleContent(Study study, Participant participant) {
        return participant.getContents().stream()
                .filter(content -> content.hasSameCycleWith(study))
                .findFirst()
                .orElseThrow(CurrentCycleContentNotExistsException::new);
    }
}
