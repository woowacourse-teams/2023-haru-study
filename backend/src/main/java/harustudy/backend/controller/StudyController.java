package harustudy.backend.controller;

import harustudy.backend.dto.request.ParticipateRequest;
import harustudy.backend.dto.request.StudyAuthRequest;
import harustudy.backend.dto.response.StudyAuthResponse;
import harustudy.backend.dto.response.StudyMetadataResponse;
import harustudy.backend.service.CreatePomodoroStudyService;
import harustudy.backend.service.ParticipateService;
import harustudy.backend.service.PomodoroProgressService;
import harustudy.backend.service.StudyAuthService;
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
    private final StudyAuthService studyAuthService;
    private final ParticipateService participateService;

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
        return ResponseEntity.created(
                        URI.create("/api/studies/" + createPomodoroStudyDto.studyId()))
                .body(CreatePomodoroStudyResponse.of(createPomodoroStudyDto));
    }

    @PostMapping("/api/studies/authenticate")
    public ResponseEntity<StudyAuthResponse> checkAuth(
            @RequestBody StudyAuthRequest request
    ) {
        StudyAuthResponse response = studyAuthService.checkAuthCode(
                request.participantCode(), request.memberId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/studies/{studyId}/members")
    public ResponseEntity<Void> participate(
            @PathVariable Long studyId,
            @RequestBody ParticipateRequest request
    ) {
        Long memberId = participateService.participate(studyId, request.nickname());

        return ResponseEntity.created(
                URI.create("/api/studies/" + studyId + "/members/" + memberId)).build();
    }
}
