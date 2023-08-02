package harustudy.backend.room.controller;

import harustudy.backend.participantcode.dto.FindRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponseV2;
import harustudy.backend.room.service.PomodoroRoomServiceV2;
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

@RequiredArgsConstructor
@RestController
public class PomodoroRoomControllerV2 {

    private final PomodoroRoomServiceV2 pomodoroRoomService;

    @GetMapping("/api/v2/studies/{studyId}")
    public ResponseEntity<PomodoroRoomResponseV2> findStudy(@PathVariable Long studyId) {
        return ResponseEntity.ok(pomodoroRoomService.findPomodoroRoom(studyId));
    }

    @GetMapping("/api/v2/studies")
    public ResponseEntity<PomodoroRoomResponseV2> findRoom(
            @RequestParam("participantCode") String participantCode) {
        return ResponseEntity.ok(
                pomodoroRoomService.findPomodoroRoomByParticipantCode(participantCode));
    }

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
