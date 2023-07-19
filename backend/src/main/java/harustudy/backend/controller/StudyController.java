package harustudy.backend.controller;

import harustudy.backend.dto.response.StudyMetadataResponse;
import harustudy.backend.service.CreatePomodoroStudyService;
import harustudy.backend.service.PomodoroProgressService;
import harustudy.backend.service.dto.CreatePomodoroStudyDto;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class StudyController {

    private final PomodoroProgressService pomodoroProgressService;
    private final CreatePomodoroStudyService createPomodoroStudyService;

    @GetMapping("/api/studies/{studyId}/metadata")
    public ResponseEntity<StudyMetadataResponse> findStudyMetaData(@PathVariable Long studyId) {
        return ResponseEntity.ok(pomodoroProgressService.findStudyMetadata(studyId));
    }

    @PostMapping("/api/studies")
    public ResponseEntity<CreatePomodoroStudyResponse> createStudy(
            @Valid @RequestBody CreatePomodoroStudyRequest request
    ) {
        CreatePomodoroStudyDto createPomodoroStudyDto =
                createPomodoroStudyService.createStudy(request);
        return ResponseEntity.created(URI.create("/api/studies/" + createPomodoroStudyDto.studyId()))
                .body(CreatePomodoroStudyResponse.of(createPomodoroStudyDto));
    }
}
  
