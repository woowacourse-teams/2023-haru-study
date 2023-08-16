package harustudy.backend.progress.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.common.SwaggerExceptionResponse;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.progress.dto.ParticipateStudyRequest;
import harustudy.backend.progress.dto.PomodoroProgressResponse;
import harustudy.backend.progress.dto.PomodoroProgressesResponse;
import harustudy.backend.progress.exception.NicknameLengthException;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.progress.service.PomodoroProgressService;
import harustudy.backend.room.exception.RoomNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "진행 관련 기능")
@RequiredArgsConstructor
@RestController
public class PomodoroProgressController {

    private final PomodoroProgressService pomodoroProgressService;

    @SwaggerExceptionResponse({
            MemberNotFoundException.class,
            RoomNotFoundException.class,
            PomodoroProgressNotFoundException.class,
            AuthorizationException.class,
            ProgressNotBelongToRoomException.class
    })
    @Operation(summary = "단일 스터디 진행도 조회")
    @GetMapping("/api/studies/{studyId}/progresses/{progressId}")
    public ResponseEntity<PomodoroProgressResponse> findPomodoroProgress(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @PathVariable Long progressId
    ) {
        PomodoroProgressResponse response =
                pomodoroProgressService.findPomodoroProgress(authMember, studyId, progressId);
        return ResponseEntity.ok(response);
    }

    @SwaggerExceptionResponse({
            RoomNotFoundException.class,
            MemberNotFoundException.class,
            PomodoroProgressNotFoundException.class,
            AuthorizationException.class
    })
    @Operation(summary = "필터링 조건으로 스터디 진행도 조회")
    @GetMapping("/api/studies/{studyId}/progresses")
    public ResponseEntity<PomodoroProgressesResponse> findPomodoroProgressesWithFilter(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestParam(required = false) Long memberId
    ) {
        PomodoroProgressesResponse response =
                pomodoroProgressService.findPomodoroProgressWithFilter(authMember, studyId, memberId);
        return ResponseEntity.ok(response);
    }

    @SwaggerExceptionResponse({
            MemberNotFoundException.class,
            PomodoroProgressNotFoundException.class,
            RoomNotFoundException.class,
            AuthorizationException.class,
            ProgressNotBelongToRoomException.class
    })
    @Operation(summary = "다음 스터디 단계로 이동")
    @ApiResponse(responseCode = "204")
    @PostMapping("/api/studies/{studyId}/progresses/{progressId}/next-step")
    public ResponseEntity<Void> proceed(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @PathVariable Long progressId
    ) {
        pomodoroProgressService.proceed(authMember, studyId, progressId);
        return ResponseEntity.noContent().build();
    }

    @SwaggerExceptionResponse({
            MemberNotFoundException.class,
            RoomNotFoundException.class,
            AuthorizationException.class,
            NicknameLengthException.class
    })
    @Operation(summary = "스터디 참여")
    @ApiResponse(responseCode = "201")
    @PostMapping("/api/studies/{studyId}/progresses")
    public ResponseEntity<Void> participate(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestBody ParticipateStudyRequest request
    ) {
        Long progressId = pomodoroProgressService.participateStudy(authMember, studyId, request);
        return ResponseEntity.created(
                URI.create("/api/v3/studies/" + studyId + "/progresses/" + progressId)).build();
    }
}
