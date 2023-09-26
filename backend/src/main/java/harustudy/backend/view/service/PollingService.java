package harustudy.backend.view.service;

import harustudy.backend.study.domain.Study;
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
        // Dto 프로잭션 적용하기
        Study study = studyRepository.findByIdIfExists(studyId);
        return ProgressPollingResponse.from(study);
    }
}
