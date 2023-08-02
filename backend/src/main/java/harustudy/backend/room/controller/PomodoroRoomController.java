package harustudy.backend.room.controller;

import harustudy.backend.room.dto.*;
import harustudy.backend.room.service.PomodoroRoomService;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class PomodoroRoomController {

    private final PomodoroRoomService pomodoroRoomService;

    @Deprecated
    @GetMapping("/api/studies/{studyId}/metadata")
    public ResponseEntity<PomodoroRoomAndMembersResponse> findStudyMetaData(@PathVariable Long studyId) {
        return ResponseEntity.ok(pomodoroRoomService.findPomodoroRoomMetadata(studyId));
    }

    @Deprecated
    @PostMapping("/api/studies")
    public ResponseEntity<CreatePomodoroRoomResponse> createStudy(
            @Valid @RequestBody CreatePomodoroRoomRequest request
    ) {
        CreatePomodoroRoomDto createPomodoroRoomDto = pomodoroRoomService.createPomodoroRoom(request);
        return ResponseEntity.created(
                        URI.create("/api/studies/" + createPomodoroRoomDto.studyId()))
                .body(CreatePomodoroRoomResponse.from(createPomodoroRoomDto));
    }

    @Deprecated
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
