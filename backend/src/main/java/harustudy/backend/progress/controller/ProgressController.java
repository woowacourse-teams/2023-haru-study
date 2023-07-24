package harustudy.backend.progress.controller;

import harustudy.backend.record.service.ProceedPomodoroStudyService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ProgressController {

    private final ProceedPomodoroStudyService proceedPomodoroStudyService;

    @PostMapping("api/studies/{studyId}/members/{memberId}/next-step")
    public ResponseEntity<Void> proceed(@PathVariable("studyId") @NotNull Long studyId,
            @PathVariable("memberId") @NotNull Long memberId) {
        proceedPomodoroStudyService.proceedToRetrospect(studyId, memberId);
        return ResponseEntity.ok().build();
    }
}
