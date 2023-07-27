package harustudy.backend.room.controller;

import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.ParticipateRequest;
import harustudy.backend.room.dto.ReParticipateRequest;
import harustudy.backend.room.dto.RoomAndMembersResponse;
import harustudy.backend.room.service.RoomService;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class RoomController {

    private final RoomService roomService;

    @GetMapping("/api/studies/{studyId}/metadata")
    public ResponseEntity<RoomAndMembersResponse> findStudyMetaData(@PathVariable Long studyId) {
        return ResponseEntity.ok(roomService.findStudyMetadata(studyId));
    }

    @PostMapping("/api/studies")
    public ResponseEntity<CreatePomodoroRoomResponse> createStudy(
            @Valid @RequestBody CreatePomodoroRoomRequest request
    ) {
        CreatePomodoroRoomDto createPomodoroRoomDto = roomService.createRoom(request);
        return ResponseEntity.created(
                        URI.create("/api/studies/" + createPomodoroRoomDto.studyId()))
                .body(CreatePomodoroRoomResponse.of(createPomodoroRoomDto));
    }

    @PostMapping("/api/studies/{studyId}/members")
    public ResponseEntity<Void> participate(
            @PathVariable Long studyId,
            @RequestBody ParticipateRequest request
    ) {
        Long memberId = roomService.participate(studyId, request.nickname());
        return ResponseEntity.created(
                URI.create("/api/studies/" + studyId + "/members/" + memberId)).build();
    }

    @PostMapping("/api/v2/studies/{studyId}/participate")
    public ResponseEntity<Void> participateV2(
            @PathVariable Long studyId,
            @Valid @RequestBody ParticipateRequest request
    ) {
        return ResponseEntity.created(
                URI.create("/api/studies/" + studyId + "/members/")).build();
    }

    @PostMapping("/api/v2/studies/{studyId}/reparticipate")
    public ResponseEntity<Void> reParticipateV2(
            @PathVariable Long studyId,
            @Valid @RequestBody ReParticipateRequest request
    ) {
        return ResponseEntity.ok(null);
    }
}
