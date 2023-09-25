package harustudy.backend.view.service;

import harustudy.backend.view.dto.ProgressPollingResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PollingService {

    public ProgressPollingResponse progressPolling(Long studyId) {
        return null;
    }
}
