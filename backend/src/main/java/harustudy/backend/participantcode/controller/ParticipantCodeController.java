package harustudy.backend.participantcode.controller;

import harustudy.backend.participantcode.dto.StudyAuthRequest;
import harustudy.backend.participantcode.dto.StudyAuthResponse;
import harustudy.backend.participantcode.service.ParticipantCodeService;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ParticipantCodeController {

    private final ParticipantCodeService participantCodeService;

    @PostMapping("/api/studies/authenticate")
    public ResponseEntity<StudyAuthResponse> checkAuth(
            @RequestBody StudyAuthRequest request
    ) {
        if (Objects.isNull(request.memberId())) {
            return ResponseEntity.ok(
                    participantCodeService.findRoomByCode(request.participantCode()));
        }
        return ResponseEntity.ok(
                participantCodeService.findRoomByCodeWithMemberId(request.participantCode(),
                        request.memberId()));
    }
}
