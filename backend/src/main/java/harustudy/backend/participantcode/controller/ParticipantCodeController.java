package harustudy.backend.participantcode.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.participantcode.dto.ParticipantCodeResponse;
import harustudy.backend.participantcode.service.ParticipantCodeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "참여 코드 관련 기능")
@RequiredArgsConstructor
@RestController
public class ParticipantCodeController {

    private final ParticipantCodeService participantCodeService;

    @Operation(summary = "스터디 아이디로 참여 코드 조회")
    @GetMapping("/api/participantCodes")
    public ResponseEntity<ParticipantCodeResponse> findParticipantCodeByStudyId(
            @Authenticated AuthMember authMember,
            @RequestParam Long studyId
    ) {
        ParticipantCodeResponse response = participantCodeService.findParticipantCodeByStudyId(
                studyId);
        return ResponseEntity.ok(response);
    }
}
