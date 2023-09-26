package harustudy.backend.view.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.view.dto.ProgressPollingResponse;
import harustudy.backend.view.service.PollingService;
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
    @GetMapping("/api/progress")
    public ResponseEntity<ProgressPollingResponse> progressPolling(
            @Authenticated AuthMember authMember, @RequestParam Long studyId
    ) {
        ProgressPollingResponse progressPollingResponse = pollingService.pollProgress(studyId);
        return ResponseEntity.ok(progressPollingResponse);
    }
    private final PollingService pollingService;

    @GetMapping("/api/waiting")
    public ResponseEntity<WaitingResponse> pollWaiting(@Authenticated AuthMember authMember, @RequestParam Long studyId) {
        WaitingResponse waitingResponse = pollingService.pollWaiting(studyId);
        return ResponseEntity.ok(waitingResponse);
    }
}
