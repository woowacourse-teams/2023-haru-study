package harustudy.backend.controller;

import harustudy.backend.service.CreatePomodoroStudyService;
import harustudy.backend.service.dto.CreatePomodoroStudyDto;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class StudyController {

    private final CreatePomodoroStudyService createPomodoroStudyService;

    @PostMapping("/api/studies")
    public ResponseEntity<CreatePomodoroStudyResponse> createStudy(
            @Valid @RequestBody CreatePomodoroStudyRequest request
    ) {
        CreatePomodoroStudyDto createPomodoroStudyDto =
                createPomodoroStudyService.createStudy(request);
        return ResponseEntity.created(
                        URI.create("/api/studies/" + createPomodoroStudyDto.studyId()))
                .body(CreatePomodoroStudyResponse.of(createPomodoroStudyDto));
    }
}
