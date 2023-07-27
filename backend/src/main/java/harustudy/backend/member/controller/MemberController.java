package harustudy.backend.member.controller;

import harustudy.backend.member.dto.NicknameResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemberController {

    @GetMapping("/api/v2/studies/{studyId}/members/{memberId}")
    public ResponseEntity<NicknameResponse> findNicknameByMemberIdV2(@PathVariable Long memberId) {
        return ResponseEntity.ok(null);
    }
}
