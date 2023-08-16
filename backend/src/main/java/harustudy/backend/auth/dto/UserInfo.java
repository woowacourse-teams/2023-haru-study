package harustudy.backend.auth.dto;

import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import lombok.Builder;

@Builder
public record UserInfo(String name, String email, String imageUrl) {

    public Member toMember(LoginType loginType) {
        return new Member(name, email, imageUrl, loginType);
    }
}
