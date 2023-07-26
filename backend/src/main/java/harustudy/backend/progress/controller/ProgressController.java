package harustudy.backend.progress.controller;

import harustudy.backend.progress.dto.RoomAndProgressStepResponse;
import harustudy.backend.progress.service.ProgressService;
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

    private final ProgressService progressService;

    @PostMapping("api/studies/{studyId}/members/{memberId}/next-step")
    public ResponseEntity<Void> proceed(@PathVariable("studyId") @NotNull Long studyId,
            @PathVariable("memberId") @NotNull Long memberId) {
        progressService.proceedToRetrospect(studyId, memberId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/studies/{studyId}/members/{memberId}/metadata")
    public ResponseEntity<RoomAndProgressStepResponse> findMemberStudyMetaData(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(progressService.findMemberMetaData(studyId, memberId));
    }
}
