package harustudy.backend.content.controller;

import harustudy.backend.common.SwaggerExceptionResponse;
import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.content.exception.PomodoroContentNotFoundException;
import harustudy.backend.content.service.PomodoroContentServiceV2;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressStatusException;
import harustudy.backend.room.exception.RoomNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "컨텐츠 관련 기능")
@RequiredArgsConstructor
@Deprecated
@RestController
public class PomodoroContentControllerV2 {

    private final PomodoroContentServiceV2 pomodoroContentService;

    @Operation(summary = "사이클 횟수에 해당하는 멤버 컨텐츠 조회")
    @SwaggerExceptionResponse({
            RoomNotFoundException.class,
            MemberNotFoundException.class,
            PomodoroProgressNotFoundException.class})
    @GetMapping("/api/v2/studies/{studyId}/contents")
    public ResponseEntity<PomodoroContentsResponse> findMemberContent(
            @PathVariable("studyId") Long studyId,
            @RequestParam("memberId") Long memberId,
            @RequestParam(name = "cycle", required = false) Integer cycle
    ) {
        return ResponseEntity.ok(pomodoroContentService.findMemberContentWithCycleFilter(studyId, memberId, cycle));
    }

    @Operation(summary = "스터디 계획 작성")
    @SwaggerExceptionResponse({
            RoomNotFoundException.class,
            MemberNotFoundException.class,
            PomodoroProgressStatusException.class,
            PomodoroContentNotFoundException.class,
            PomodoroProgressNotFoundException.class})
    @PostMapping("/api/v2/studies/{studyId}/contents/write-plan")
    public ResponseEntity<Void> writePlan(
            @PathVariable("studyId") Long studyId,
            @RequestBody WritePlanRequest request
    ) {
        pomodoroContentService.writePlan(studyId, request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "스터디 회고 작성")
    @SwaggerExceptionResponse({
            RoomNotFoundException.class,
            MemberNotFoundException.class,
            PomodoroProgressStatusException.class,
            PomodoroProgressNotFoundException.class,
            PomodoroContentNotFoundException.class})
    @PostMapping("/api/v2/studies/{studyId}/contents/write-retrospect")
    public ResponseEntity<Void> writeRetrospect(
            @PathVariable("studyId") Long studyId,
            @RequestBody WriteRetrospectRequest request
    ) {
        pomodoroContentService.writeRetrospect(studyId, request);
        return ResponseEntity.ok().build();
    }
}
