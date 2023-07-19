package harustudy.backend.controller;

import harustudy.backend.dto.response.StudyMetadataResponse;
import harustudy.backend.service.PomodoroProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class StudyController {

    private final PomodoroProgressService pomodoroProgressService;

    @GetMapping("/api/studies/{studyId}/metadata")
    public ResponseEntity<StudyMetadataResponse> findStudyMetaData(@PathVariable Long studyId) {
        return ResponseEntity.ok(pomodoroProgressService.findStudyMetadata(studyId));
    }
}
