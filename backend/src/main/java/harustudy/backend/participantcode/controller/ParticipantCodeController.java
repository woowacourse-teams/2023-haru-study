package harustudy.backend.participantcode.controller;

import harustudy.backend.participantcode.dto.StudyAuthRequest;
import harustudy.backend.participantcode.dto.StudyAuthResponse;
import harustudy.backend.participantcode.service.StudyAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ParticipantCodeController {

    private final StudyAuthService studyAuthService;

    @PostMapping("/api/studies/authenticate")
    public ResponseEntity<StudyAuthResponse> checkAuth(
            @RequestBody StudyAuthRequest request
    ) {
        StudyAuthResponse response = studyAuthService.checkAuthCode(
                request.participantCode(), request.memberId());
        return ResponseEntity.ok(response);
    }
}
