package harustudy.backend.progress.controller;

import harustudy.backend.progress.dto.PomodoroProgressResponseV2;
import harustudy.backend.progress.service.PomodoroProgressServiceV2;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PomodoroProgressControllerV2 {

    private final PomodoroProgressServiceV2 pomodoroProgressServiceV2;

    @GetMapping("/api/v2/studies/{studyId}/progresses")
    public ResponseEntity<PomodoroProgressResponseV2> findProgress(@PathVariable("studyId") Long studyId,
            @RequestParam("memberId") Long memberId) {
        PomodoroProgressResponseV2 response = pomodoroProgressServiceV2.findProgress(studyId,
                memberId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v2/studies/{studyId}/progresses/{progressId}/next-step")
    public ResponseEntity<Void> proceed(
            @PathVariable("studyId") Long studyId,
            @PathVariable("progressId") Long progressId
    ) {
        pomodoroProgressServiceV2.proceed(studyId, progressId);
        return ResponseEntity.noContent().build();
    }
}
