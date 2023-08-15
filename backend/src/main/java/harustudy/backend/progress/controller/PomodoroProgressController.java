package harustudy.backend.progress.controller;

import harustudy.backend.auth.AuthMember;
import harustudy.backend.auth.Authenticated;
import harustudy.backend.progress.dto.PomodoroProgressRequest;
import harustudy.backend.progress.dto.PomodoroProgressResponse;
import harustudy.backend.progress.dto.PomodoroProgressesResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "진행 관련 기능")
@RequiredArgsConstructor
@RestController
public class PomodoroProgressController {

    @Operation(summary = "단일 스터디 진행도 조회")
    @GetMapping("/api/studies/{studyId}/progresses/{progressId}")
    public ResponseEntity<PomodoroProgressResponse> findPomodoroProgress(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @PathVariable Long progressId
    ) {
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "필터링 조건으로 스터디 진행도 조회")
    @GetMapping("/api/studies/{studyId}/progresses")
    public ResponseEntity<PomodoroProgressesResponse> findPomodoroProgressesWithFilter(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestParam(required = false) Long memberId
    ) {
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "다음 스터디 단계로 이동")
    @ApiResponse(responseCode = "204")
    @PostMapping("/api/studies/{studyId}/progresses/{progressId}/next-step")
    public ResponseEntity<Void> proceed(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @PathVariable Long progressId
    ) {
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "스터디 참여")
    @ApiResponse(responseCode = "201")
    @PostMapping("/api/studies/{studyId}/progresses")
    public ResponseEntity<Void> participate(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestBody PomodoroProgressRequest request
    ) {
        return ResponseEntity.created(
                URI.create("/api/v3/studies/" + studyId + "/progresses/" + 1L)).build();
    }
}
