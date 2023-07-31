package harustudy.backend.progress.controller;

import harustudy.backend.progress.dto.PomodoroProgressResponse;
import harustudy.backend.progress.dto.RoomAndProgressStepResponse;
import harustudy.backend.progress.service.PomodoroProgressService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ProgressController {

    private final PomodoroProgressService pomodoroProgressService;

    @PostMapping("api/studies/{studyId}/members/{memberId}/next-step")
    public ResponseEntity<Void> proceed(@PathVariable("studyId") @NotNull Long studyId,
            @PathVariable("memberId") @NotNull Long memberId) {
        pomodoroProgressService.proceedToRetrospect(studyId, memberId);
        return ResponseEntity.ok().build();
    }

    // TODO: API 분리 + metatdata 키워드 삭제
    @GetMapping("/api/studies/{studyId}/members/{memberId}/metadata")
    public ResponseEntity<RoomAndProgressStepResponse> findMemberStudyMetaData(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(pomodoroProgressService.findMemberMetaData(studyId, memberId));
    }

    @GetMapping("api/studies/{studyId}/members/{memberId}/progress")
    public ResponseEntity<PomodoroProgressResponse> findPomodoroProgress(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(pomodoroProgressService.findPomodoroProgress(studyId, memberId));
    }
}
