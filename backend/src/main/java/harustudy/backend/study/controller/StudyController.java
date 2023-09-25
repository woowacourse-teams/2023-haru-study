package harustudy.backend.study.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.study.dto.CreateStudyRequest;
import harustudy.backend.study.dto.CreateStudyResponse;
import harustudy.backend.study.dto.StudyResponse;
import harustudy.backend.study.dto.StudiesResponse;
import harustudy.backend.study.service.StudyService;
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
public class StudyController {

    private final StudyService studyService;

    @Operation(summary = "단일 스터디 정보 조회")
    @GetMapping("/api/studies/{studyId}")
    public ResponseEntity<StudyResponse> findStudy(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId
    ) {
        StudyResponse response = studyService.findStudy(studyId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "필터링 조건으로 스터디 조회")
    @GetMapping("/api/studies")
    public ResponseEntity<StudiesResponse> findStudiesWithFilter(
            @Authenticated AuthMember authMember,
            @RequestParam(required = false) Long memberId,
            @RequestParam(required = false) String participantCode
    ) {
        StudiesResponse response = studyService.findStudyWithFilter(memberId, participantCode);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 생성")
    @ApiResponse(responseCode = "201")
    @PostMapping("/api/studies")
    public ResponseEntity<CreateStudyResponse> createStudy(
            @Authenticated AuthMember authMember,
            @RequestBody CreateStudyRequest request
    ) {
        CreateStudyResponse response = studyService.createStudy(request);
        return ResponseEntity.created(URI.create("/api/studies/" + response.studyId()))
                .body(response);
    }

    @Operation(summary = "다음 스터디 단계로 이동")
    @ApiResponse(responseCode = "204")
    @PostMapping("/api/studies/{studyId}/next-step")
    public ResponseEntity<Void> proceed(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId
    ) {
        studyService.proceed(authMember, studyId);
        return ResponseEntity.noContent().build();
    }
}
