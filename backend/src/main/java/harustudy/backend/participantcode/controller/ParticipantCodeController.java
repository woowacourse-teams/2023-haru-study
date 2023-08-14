package harustudy.backend.participantcode.controller;

import harustudy.backend.participantcode.dto.FindRoomRequest;
import harustudy.backend.participantcode.dto.FindRoomResponse;
import harustudy.backend.participantcode.service.ParticipantCodeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Deprecated
@RequiredArgsConstructor
@RestController
public class ParticipantCodeController {

    private final ParticipantCodeService participantCodeService;

    @Deprecated
    @PostMapping("/api/studies/authenticate")
    public ResponseEntity<FindRoomResponse> checkAuth(@Valid @RequestBody FindRoomRequest request) {
        return ResponseEntity.ok(participantCodeService.findRoomByCode(request.participantCode()));
    }
}
