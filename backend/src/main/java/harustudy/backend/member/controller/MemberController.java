package harustudy.backend.member.controller;

import harustudy.backend.member.dto.NicknameResponse;
import harustudy.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Deprecated
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @Deprecated
    @GetMapping("/api/studies/{studyId}/members/{memberId}")
    public ResponseEntity<NicknameResponse> findNickname(@PathVariable Long studyId,
            @PathVariable Long memberId) {
        NicknameResponse response = memberService.findParticipatedMemberNickname(studyId, memberId);
        return ResponseEntity.ok(response);
    }
}
