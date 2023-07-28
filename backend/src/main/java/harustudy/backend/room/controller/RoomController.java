package harustudy.backend.room.controller;

import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.ParticipateRequest;
import harustudy.backend.room.dto.RoomAndMembersResponse;
import harustudy.backend.room.service.PomodoroRoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class RoomController {

    private final PomodoroRoomService pomodoroRoomService;

    @GetMapping("/api/studies/{studyId}/metadata")
    public ResponseEntity<RoomAndMembersResponse> findStudyMetaData(@PathVariable Long studyId) {
        return ResponseEntity.ok(pomodoroRoomService.findPomodoroRoomMetadata(studyId));
    }

    @PostMapping("/api/studies")
    public ResponseEntity<CreatePomodoroRoomResponse> createStudy(
            @Valid @RequestBody CreatePomodoroRoomRequest request
    ) {
        CreatePomodoroRoomDto createPomodoroRoomDto = pomodoroRoomService.createRoom(request);
        return ResponseEntity.created(
                        URI.create("/api/studies/" + createPomodoroRoomDto.studyId()))
                .body(CreatePomodoroRoomResponse.of(createPomodoroRoomDto));
    }

    @PostMapping("/api/studies/{studyId}/members")
    public ResponseEntity<Void> participate(
            @PathVariable Long studyId,
            @Valid @RequestBody ParticipateRequest request
    ) {
        Long memberId = pomodoroRoomService.participate(studyId, request.nickname());
        return ResponseEntity.created(
                URI.create("/api/studies/" + studyId + "/members/" + memberId)).build();
    }
}
