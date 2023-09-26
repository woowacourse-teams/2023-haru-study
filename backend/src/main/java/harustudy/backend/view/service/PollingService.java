package harustudy.backend.view.service;

import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.WaitingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PollingService {

    private final StudyRepository studyRepository;

    public WaitingResponse pollWaiting(Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        return WaitingResponse.of(study, study.getParticipants());
    }
}
