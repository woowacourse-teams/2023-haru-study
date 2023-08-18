package harustudy.backend.integration;

import harustudy.backend.member.domain.Member;
import jakarta.servlet.http.Cookie;

public record MemberDto(Member member, String accessToken, Cookie cookie) {

    public String createAuthorizationHeader() {
        return "Bearer " + accessToken();
    }
}
