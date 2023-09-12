package harustudy.backend.study.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.study.dto.CreatePomodoroStudyRequest;
import harustudy.backend.study.dto.CreatePomodoroStudyResponse;
import harustudy.backend.study.dto.PomodoroStudyResponse;
import harustudy.backend.study.dto.PomodoroStudiesResponse;
import harustudy.backend.study.service.PomodoroStudyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "스터디 관련 기능")
@RequiredArgsConstructor
@RestController
public class PomodoroStudyController {

    private final PomodoroStudyService pomodoroStudyService;

    @Operation(summary = "단일 스터디 정보 조회")
    @GetMapping("/api/studies/{studyId}")
    public ResponseEntity<PomodoroStudyResponse> findStudy(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId
    ) {
        PomodoroStudyResponse response = pomodoroStudyService.findPomodoroStudy(studyId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "필터링 조건으로 스터디 조회")
    @GetMapping("/api/studies")
    public ResponseEntity<PomodoroStudiesResponse> findStudiesWithFilter(
            @Authenticated AuthMember authMember,
            @RequestParam(required = false) Long memberId,
            @RequestParam(required = false) String participantCode
    ) {
        PomodoroStudiesResponse response = pomodoroStudyService.findPomodoroStudyWithFilter(
                memberId, participantCode);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 생성")
    @ApiResponse(responseCode = "201")
    @PostMapping("/api/studies")
    public ResponseEntity<CreatePomodoroStudyResponse> createStudy(
            @Authenticated AuthMember authMember,
            @RequestBody CreatePomodoroStudyRequest request
    ) {
        CreatePomodoroStudyResponse response = pomodoroStudyService.createPomodoroStudy(request);
        return ResponseEntity.created(URI.create("/api/studies/" + response.studyId()))
                .body(response);
    }
}
