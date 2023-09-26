package harustudy.backend.view.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.view.dto.SubmittersResponse;
import harustudy.backend.view.service.PollingService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequiredArgsConstructor
@Controller
public class PollingController {

    private final PollingService pollingService;

    @Operation(summary = "스터디원 별 제출 여부 조회")
    @GetMapping("/api/submitted")
    public ResponseEntity<SubmittersResponse> findSubmitters(
            @Authenticated AuthMember authMember,
            @RequestParam Long studyId
    ) {
        return ResponseEntity.ok(pollingService.findSubmitters(studyId));
    }
}
