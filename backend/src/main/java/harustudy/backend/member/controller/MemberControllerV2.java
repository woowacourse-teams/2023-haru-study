package harustudy.backend.member.controller;

import harustudy.backend.common.SwaggerExceptionResponse;
import harustudy.backend.member.dto.GuestRegisterRequest;
import harustudy.backend.member.dto.MemberResponseV2;
import harustudy.backend.member.dto.MembersResponseV2;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.service.MemberServiceV2;
import harustudy.backend.room.exception.RoomNotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "멤버 관련 기능")
@RequiredArgsConstructor
@RestController
public class MemberControllerV2 {

    private final MemberServiceV2 memberService;

    @Operation(summary = "멤버 정보 조회")
    @SwaggerExceptionResponse({MemberNotFoundException.class})
    @GetMapping("/api/v2/members/{memberId}")
    public ResponseEntity<MemberResponseV2> findMember(@PathVariable Long memberId) {
        MemberResponseV2 response = memberService.findMember(memberId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디에 참여한 멤버 전체 조회")
    @SwaggerExceptionResponse({RoomNotFoundException.class})
    @GetMapping("/api/v2/members")
    public ResponseEntity<MembersResponseV2> findParticipatedMembers(
            @RequestParam("studyId") Long studyId) {
        MembersResponseV2 response = memberService.findParticipatedMembers(studyId);
        return ResponseEntity.ok(response);
    }

    @Deprecated
    @PostMapping("/api/v2/members/guest")
    public ResponseEntity<Void> registerGuest(HttpServletResponse servletResponse,
            @RequestBody GuestRegisterRequest request) {
        Long memberId = memberService.register(request);

        //TODO: cookie 수명 설정해주기
        Cookie cookie = new Cookie("memberId", String.valueOf(memberId));
        servletResponse.addCookie(cookie);
        return ResponseEntity.created(URI.create("/api/v2/members/" + memberId)).build();
    }
}
