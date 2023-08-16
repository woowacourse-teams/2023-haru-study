package harustudy.backend.room.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomsResponse;
import harustudy.backend.room.service.PomodoroRoomService;
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

@Tag(name = "스터디 관련 기능")
@RequiredArgsConstructor
@RestController
public class PomodoroRoomController {

    private final PomodoroRoomService pomodoroRoomService;

    @Operation(summary = "단일 스터디 정보 조회")
    @GetMapping("/api/studies/{studyId}")
    public ResponseEntity<PomodoroRoomResponse> findStudy(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId
    ) {
        PomodoroRoomResponse response = pomodoroRoomService.findPomodoroRoom(studyId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "필터링 조건으로 스터디 조회")
    @GetMapping("/api/studies")
    public ResponseEntity<PomodoroRoomsResponse> findStudiesWithFilter(
            @Authenticated AuthMember authMember,
            @RequestParam(required = false) Long memberId,
            @RequestParam(required = false) String participantCode
    ) {
        PomodoroRoomsResponse response = pomodoroRoomService.findPomodoroRoomWithFilter(
                memberId, participantCode);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 생성")
    @ApiResponse(responseCode = "201")
    @PostMapping("/api/studies")
    public ResponseEntity<CreatePomodoroRoomResponse> createStudy(
            @Authenticated AuthMember authMember,
            @RequestBody CreatePomodoroRoomRequest request
    ) {
        CreatePomodoroRoomResponse response = pomodoroRoomService.createPomodoroRoom(request);
        return ResponseEntity.created(URI.create("/api/studies/" + response.studyId()))
                .body(response);
    }
}
