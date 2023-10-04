package harustudy.backend.auth.domain.oauth;

import harustudy.backend.auth.dto.OauthTokenResponse;

import java.util.Map;

public interface OauthClient {

    OauthTokenResponse requestOauthToken(String code, String providerName);

    Map<String, Object> requestOauthUserInfo(String accessToken, String providerName);

    Boolean supports(String providerName);
}
