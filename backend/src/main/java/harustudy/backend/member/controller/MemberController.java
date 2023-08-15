package harustudy.backend.member.controller;

import harustudy.backend.auth.AuthMember;
import harustudy.backend.auth.Authenticated;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.MemberResponse;
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

    @Operation(summary = "멤버 정보 조회")
    @GetMapping("/api/members/{memberId}")
    public ResponseEntity<MemberResponse> findMember(
            @Authenticated AuthMember authMember,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(null);
    }
}
