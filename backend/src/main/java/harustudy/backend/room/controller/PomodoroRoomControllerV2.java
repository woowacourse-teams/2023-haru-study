package harustudy.backend.room.controller;

import harustudy.backend.common.SwaggerExceptionResponse;
import harustudy.backend.participantcode.exception.ParticipantCodeNotFoundException;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponseV2;
import harustudy.backend.room.exception.PomodoroRoomNameLengthException;
import harustudy.backend.room.exception.PomodoroTimePerCycleException;
import harustudy.backend.room.exception.PomodoroTotalCycleException;
import harustudy.backend.room.exception.RoomNotFoundException;
import harustudy.backend.room.service.PomodoroRoomServiceV2;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
@Deprecated
@RestController
public class PomodoroRoomControllerV2 {

    private final PomodoroRoomServiceV2 pomodoroRoomService;

    @Operation(summary = "스터디 정보 조회")
    @SwaggerExceptionResponse(RoomNotFoundException.class)
    @GetMapping("/api/v2/studies/{studyId}")
    public ResponseEntity<PomodoroRoomResponseV2> findStudy(@PathVariable Long studyId) {
        return ResponseEntity.ok(pomodoroRoomService.findPomodoroRoom(studyId));
    }

    @Operation(summary = "참여코드로 스터디 조회")
    @SwaggerExceptionResponse({
            ParticipantCodeNotFoundException.class,
            RoomNotFoundException.class})
    @GetMapping("/api/v2/studies")
    public ResponseEntity<PomodoroRoomResponseV2> findStudy(
            @RequestParam("participantCode") String participantCode) {
        return ResponseEntity.ok(
                pomodoroRoomService.findPomodoroRoomByParticipantCode(participantCode));
    }

    @Operation(summary = "스터디 생성")
    @ApiResponse(responseCode = "201")
    @SwaggerExceptionResponse({
            PomodoroRoomNameLengthException.class,
            PomodoroTotalCycleException.class,
            PomodoroTimePerCycleException.class})
    @PostMapping("/api/v2/studies")
    public ResponseEntity<CreatePomodoroRoomResponse> createStudy(
            @Valid @RequestBody CreatePomodoroRoomRequest request
    ) {
        CreatePomodoroRoomDto createPomodoroRoomDto = pomodoroRoomService.createPomodoroRoom(
                request);
        return ResponseEntity.created(
                        URI.create("/api/studies/" + createPomodoroRoomDto.studyId()))
                .body(CreatePomodoroRoomResponse.from(createPomodoroRoomDto));
    }
}
