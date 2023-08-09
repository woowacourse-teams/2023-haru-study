package harustudy.backend.auth.dto;

import harustudy.backend.auth.domain.OauthMember;
import harustudy.backend.auth.domain.SocialType;
import lombok.Builder;

@Builder
public record UserInfo(String name, String email, String imageUrl) {

    public OauthMember toOauthMember(SocialType socialType) {
        return new OauthMember(name, email, imageUrl, socialType);
    }
}
