package harustudy.backend.view.service;

import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.ProgressPollingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PollingService {

    private final StudyRepository studyRepository;

    public ProgressPollingResponse progressPolling(Long studyId) {
        String step = studyRepository.findProgressPollingInfoById(studyId).orElseThrow(
                StudyNotFoundException::new);
        return ProgressPollingResponse.from(step);
    }
}
