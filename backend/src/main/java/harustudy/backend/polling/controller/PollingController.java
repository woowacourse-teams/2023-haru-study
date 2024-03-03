package harustudy.backend.polling.controller;

import harustudy.backend.polling.dto.ProgressResponse;
import harustudy.backend.polling.dto.SubmittersResponse;
import harustudy.backend.polling.dto.WaitingResponse;
import harustudy.backend.polling.service.PollingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "폴링 관련 기능")
@RequiredArgsConstructor
@RestController
public class PollingController {

    private final PollingService pollingService;

    @Operation(summary = "진행 페이지 폴링")
    @GetMapping("/api/v2/progress")
    public ResponseEntity<ProgressResponse> progressPolling(@RequestParam Long studyId) {
        ProgressResponse progressResponse = pollingService.pollInProgress(studyId);
        return ResponseEntity.ok(progressResponse);
    }

    @Operation(summary = "대기 페이지 폴링")
    @GetMapping("/api/v2/waiting")
    public ResponseEntity<WaitingResponse> pollWaiting(@RequestParam Long studyId) {
        WaitingResponse waitingResponse = pollingService.pollWaiting(studyId);
        return ResponseEntity.ok(waitingResponse);
    }

    @Operation(summary = "스터디원 별 제출 여부 조회")
    @GetMapping("/api/v2/submitted")
    public ResponseEntity<SubmittersResponse> findSubmitters(@RequestParam Long studyId) {
        return ResponseEntity.ok(pollingService.findSubmitters(studyId));
    }
}
