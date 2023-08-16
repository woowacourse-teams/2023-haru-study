package harustudy.backend.member.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.dto.MemberResponse;
import harustudy.backend.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "멤버 관련 기능")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "멤버 정보 조회")
    @GetMapping("/api/members/{memberId}")
    public ResponseEntity<MemberResponse> findMember(
            @Authenticated AuthMember authMember,
            @PathVariable Long memberId
    ) {
        MemberResponse response = memberService.findMember(authMember, memberId);
        return ResponseEntity.ok(response);
    }
}
