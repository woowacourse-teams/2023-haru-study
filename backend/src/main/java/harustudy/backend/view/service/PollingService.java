package harustudy.backend.view.service;

import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.WaitingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PollingService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;

    public WaitingResponse pollWaiting(Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        List<Participant> participants = participantRepository.findByStudy(study);
        List<ParticipantResponse> participantResponses = mapToParticipantResponses(participants);
        return WaitingResponse.of(study, participantResponses);
    }

    private List<ParticipantResponse> mapToParticipantResponses(List<Participant> participants) {
        return participants.stream()
                .map(ParticipantResponse::from)
                .toList();
    }
}
