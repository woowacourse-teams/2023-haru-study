package harustudy.backend.view.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.view.dto.WaitingResponse;
import harustudy.backend.view.service.PollingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PollingController {

    private final PollingService pollingService;

    @GetMapping("/api/waiting")
    public ResponseEntity<WaitingResponse> waiting(@Authenticated AuthMember authMember, @RequestParam Long studyId) {
        WaitingResponse waitingResponse = pollingService.waiting(studyId);
        return ResponseEntity.ok(waitingResponse);
    }
}
