package harustudy.backend.content.controller;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.common.exception.SwaggerExceptionResponse;
import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.content.exception.PomodoroContentNotFoundException;
import harustudy.backend.content.service.PomodoroContentService;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressStatusException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.room.exception.RoomNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "컨텐츠 관련 기능")
@RequiredArgsConstructor
@RestController
public class PomodoroContentController {

    private final PomodoroContentService pomodoroContentService;

    @SwaggerExceptionResponse({
            RoomNotFoundException.class,
            MemberNotFoundException.class,
            AuthorizationException.class,
            PomodoroProgressNotFoundException.class,
            PomodoroContentNotFoundException.class
    })
    @Operation(summary = "필터링 조건으로 멤버 컨텐츠 조회")
    @GetMapping("/api/studies/{studyId}/contents")
    public ResponseEntity<PomodoroContentsResponse> findMemberContentsWithFilter(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestParam Long progressId,
            @RequestParam(required = false) Integer cycle
    ) {
        PomodoroContentsResponse response = pomodoroContentService.findContentsWithFilter(authMember, studyId, progressId, cycle);
        return ResponseEntity.ok(response);
    }

    @SwaggerExceptionResponse({
            RoomNotFoundException.class,
            MemberNotFoundException.class,
            AuthorizationException.class,
            PomodoroProgressNotFoundException.class,
            ProgressNotBelongToRoomException.class
    })
    @Operation(summary = "스터디 계획 작성")
    @PostMapping("/api/studies/{studyId}/contents/write-plan")
    public ResponseEntity<Void> writePlan(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestBody WritePlanRequest request
    ) {
        pomodoroContentService.writePlan(authMember, studyId, request);
        return ResponseEntity.ok().build();
    }

    @SwaggerExceptionResponse({
            MemberNotFoundException.class,
            RoomNotFoundException.class,
            PomodoroProgressNotFoundException.class,
            AuthorizationException.class,
            PomodoroProgressStatusException.class,
            PomodoroContentNotFoundException.class
    })
    @Operation(summary = "스터디 회고 작성")
    @PostMapping("/api/studies/{studyId}/contents/write-retrospect")
    public ResponseEntity<Void> writeRetrospect(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestBody WriteRetrospectRequest request
    ) {
        pomodoroContentService.writeRetrospect(authMember, studyId, request);
        return ResponseEntity.ok().build();
    }
}
