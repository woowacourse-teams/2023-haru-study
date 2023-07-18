package harustudy.backend.controller;

import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.StudyMetadataResponse;
import harustudy.backend.service.PomodoroProgressService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class StudyController {

    private final PomodoroProgressService pomodoroProgressService;

    @GetMapping("/api/studies/{studyId}/metadata")
    public ResponseEntity<StudyMetadataResponse> findStudyMetaData(
            @PathVariable Long studyId
    ) {
        return ResponseEntity.ok(pomodoroProgressService.findStudyMetadata(studyId));
    }

    @GetMapping("/api/studies/{studyId}/content/plans")
    public ResponseEntity<CurrentCyclePlanResponse> findCurrentCyclePlan(
            @PathVariable Long studyId,
            @RequestParam Integer cycle,
            @RequestParam Long memberId) {
        return ResponseEntity.ok(
                pomodoroProgressService.findCurrentCyclePlan(cycle,
                        studyId, memberId));
    }

}
