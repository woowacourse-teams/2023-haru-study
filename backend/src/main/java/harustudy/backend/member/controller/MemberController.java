package harustudy.backend.member.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.dto.MemberResponse;
import harustudy.backend.member.dto.UnregisterRequest;
import harustudy.backend.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "멤버 관련 기능")
@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @Operation(summary = "멤버 프로필 조회")
    @GetMapping("/api/me")
    public ResponseEntity<MemberResponse> findProfile(@Authenticated AuthMember authMember) {
        MemberResponse response = memberService.findMemberProfile(authMember);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "회원 탈퇴")
    @PostMapping("/api/unregister")
    public ResponseEntity<Void> unregister(@Authenticated AuthMember authMember,
            @RequestBody UnregisterRequest request) {
        memberService.unregister(authMember, request);
        return ResponseEntity.noContent().build();
    }
}
