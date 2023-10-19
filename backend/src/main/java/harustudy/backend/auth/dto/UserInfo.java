package harustudy.backend.auth.dto;

import harustudy.backend.auth.exception.UserInfoFormatException;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import lombok.Builder;

import java.util.Objects;

@Builder
public record UserInfo(String name, String email, String imageUrl) {

    public UserInfo {
        if (Objects.isNull(name) || Objects.isNull(email) || Objects.isNull(imageUrl)) {
            throw new UserInfoFormatException();
        }
    }

    public Member toMember(LoginType loginType) {
        return new Member(name, email, imageUrl, loginType);
    }
}
