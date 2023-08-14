package harustudy.backend.progress.controller;

import harustudy.backend.auth.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.progress.dto.PomodoroProgressRequestV3;
import harustudy.backend.progress.dto.PomodoroProgressResponseV3;
import harustudy.backend.progress.dto.PomodoroProgressesResponseV3;
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
public class PomodoroProgressControllerV3 {

    @Operation(summary = "멤버의 스터디 진행도 조회")
    @GetMapping("/api/v3/studies/{studyId}/progresses")
    public ResponseEntity<PomodoroProgressesResponseV3> findMemberProgress(
            @PathVariable Long studyId,
            @RequestParam(required = false, value = "memberId") Long memberId,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "스터디 진행도 조회")
    @GetMapping("/api/v3/studies/{studyId}/progresses/{progressId}")
    public ResponseEntity<PomodoroProgressResponseV3> findProgress(
            @PathVariable("studyId") Long studyId,
            @PathVariable("progressId") Long progressId,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "스터디 진행")
    @ApiResponse(responseCode = "204")
    @PostMapping("/api/v3/studies/{studyId}/progress"
            + "es/{progressId}/next-step")
    public ResponseEntity<Void> proceed(
            @PathVariable("studyId") Long studyId,
            @PathVariable("progressId") Long progressId,
            @AuthMember Member member
    ) {
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "스터디 참여")
    @ApiResponse(responseCode = "201")
    @PostMapping("/api/v3/studies/{studyId}/progresses")
    public ResponseEntity<Void> participate(
            @PathVariable("studyId") Long studyId,
            @RequestBody PomodoroProgressRequestV3 request,
            @AuthMember Member member
    ) {
        return ResponseEntity.created(
                URI.create("/api/v3/studies/" + studyId + "/progresses/" + 1L)).build();
    }
}
