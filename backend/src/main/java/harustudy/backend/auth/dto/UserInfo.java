package harustudy.backend.auth.dto;

import harustudy.backend.auth.domain.OauthMember;
import harustudy.backend.auth.domain.LoginType;
import lombok.Builder;

@Builder
public record UserInfo(String name, String email, String imageUrl) {

    public OauthMember toOauthMember(LoginType loginType) {
        return new OauthMember(name, email, imageUrl, loginType);
    }
}
