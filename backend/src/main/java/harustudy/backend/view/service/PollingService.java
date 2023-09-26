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
}
