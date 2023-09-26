package harustudy.backend.view.service;

import harustudy.backend.content.domain.Content;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.SubmitterResponse;
import harustudy.backend.view.dto.SubmittersResponse;
import harustudy.backend.view.exception.CurrentCycleContentNotExistsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class PollingService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;

    public SubmittersResponse findSubmitters(Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        List<Participant> participants = participantRepository.findByStudy(study);
        List<SubmitterResponse> submitterResponses = generateSubmitterResponses(study, participants);
        return new SubmittersResponse(submitterResponses);
    }

    private List<SubmitterResponse> generateSubmitterResponses(Study study, List<Participant> participants) {
        List<SubmitterResponse> submitterResponses = new ArrayList<>();

        for (Participant participant : participants) {
            Content currentCycleContent = extractCurrentCycleContent(study, participant);

            submitterResponses.add(new SubmitterResponse(
                    participant.getNickname(),
                    SubmitterCheckingStrategy.isSubmitted(study.getStep(), currentCycleContent)));
        }
        return submitterResponses;
    }

    private Content extractCurrentCycleContent(Study study, Participant participant) {
        return participant.getContents().stream()
                .filter(content -> content.hasSameCycleWith(study))
                .findFirst()
                .orElseThrow(CurrentCycleContentNotExistsException::new);
    }
}
