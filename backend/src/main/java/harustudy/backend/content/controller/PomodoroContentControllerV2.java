package harustudy.backend.content.controller;

import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.content.service.PomodoroContentServiceV2;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PomodoroContentControllerV2 {

    private final PomodoroContentServiceV2 pomodoroContentService;

    @GetMapping("/api/v2/studies/{studyId}/contents")
    public ResponseEntity<PomodoroContentsResponse> findMemberContent(
            @PathVariable Long studyId,
            @RequestParam("memberId") Long memberId,
            @RequestParam(name = "cycle", required = false) Integer cycle
    ) {
        return ResponseEntity.ok(
                pomodoroContentService.findMemberContentWithCycleFilter(studyId, memberId, cycle));
    }

    @PostMapping("/api/v2/studies/{studyId}/contents/write-plan")
    public ResponseEntity<Void> writePlan(
            @PathVariable("studyId") Long studyId,
            @RequestBody WritePlanRequest request
    ) {
        pomodoroContentService.writePlan(studyId, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/api/v2/studies/{studyId}/contents/write-retrospect")
    public ResponseEntity<Void> writeRetrospect(
            @PathVariable("studyId") Long studyId,
            @RequestBody WriteRetrospectRequest request
    ) {
        pomodoroContentService.writeRetrospect(studyId, request);
        return ResponseEntity.ok().build();
    }
}
