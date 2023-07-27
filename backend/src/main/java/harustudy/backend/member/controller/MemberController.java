package harustudy.backend.member.controller;

import harustudy.backend.member.dto.NicknameResponse;
import harustudy.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    // TODO: studyId는 API 일관성을 위해 보류(현재는 사용하지 않음)
    @GetMapping("/api/studies/{studyId}/members/{memberId}")
    public ResponseEntity<NicknameResponse> findNicknameByMemberId(@PathVariable Long memberId) {
        NicknameResponse response = memberService.findNicknameByMemberId(memberId);
        return ResponseEntity.ok(response);
    }
}
