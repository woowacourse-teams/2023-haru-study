package harustudy.backend.member.controller;

import harustudy.backend.member.dto.GuestRegisterRequest;
import harustudy.backend.member.dto.MemberResponseV2;
import harustudy.backend.member.dto.MembersResponseV2;
import harustudy.backend.member.service.MemberServiceV2;
import jakarta.servlet.http.Cookie;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MemberControllerV2 {

    private final MemberServiceV2 memberService;

    @GetMapping("/api/v2/members/{memberId}")
    public ResponseEntity<MemberResponseV2> findMember(@PathVariable Long memberId) {
        MemberResponseV2 response = memberService.findMember(memberId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/v2/members")
    public ResponseEntity<MembersResponseV2> findParticipatedMembers(
            @RequestParam("studyId") Long studyId) {
        MembersResponseV2 response = memberService.findParticipatedMembers(studyId);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/v2/members/guest")
    public ResponseEntity<Void> registerGuest(Cookie cookie,
            @RequestBody GuestRegisterRequest request) {
        Long memberId = memberService.register(request);
        cookie.setAttribute("memberId", String.valueOf(memberId));
        return ResponseEntity.created(URI.create("/api/v2/members/" + memberId)).build();
    }
}
