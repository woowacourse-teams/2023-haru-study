package harustudy.backend.progress.controller;

import harustudy.backend.common.SwaggerExceptionResponse;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.exception.MemberNotParticipatedException;
import harustudy.backend.progress.dto.PomodoroProgressResponseV2;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.progress.service.PomodoroProgressServiceV2;
import harustudy.backend.room.exception.RoomNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "진행도 관련 기능")
@RequiredArgsConstructor
@RestController
public class PomodoroProgressControllerV2 {

    private final PomodoroProgressServiceV2 pomodoroProgressServiceV2;

    @Operation(summary = "스터디 진행도 조회")
    @SwaggerExceptionResponse({
            RoomNotFoundException.class,
            MemberNotFoundException.class,
            MemberNotParticipatedException.class})
    @GetMapping("/api/v2/studies/{studyId}/progresses")
    public ResponseEntity<PomodoroProgressResponseV2> findProgress(@PathVariable("studyId") Long studyId,
            @RequestParam("memberId") Long memberId) {
        PomodoroProgressResponseV2 response = pomodoroProgressServiceV2.findProgress(studyId,
                memberId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 진행")
    @SwaggerExceptionResponse({
            RoomNotFoundException.class,
            PomodoroProgressNotFoundException.class,
            ProgressNotBelongToRoomException.class})
    @PostMapping("/api/v2/studies/{studyId}/progresses/{progressId}/next-step")
    public ResponseEntity<Void> proceed(
            @PathVariable("studyId") Long studyId,
            @PathVariable("progressId") Long progressId
    ) {
        pomodoroProgressServiceV2.proceed(studyId, progressId);
        return ResponseEntity.noContent().build();
    }
}
