package harustudy.backend.auth.domain.oauth;

import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.util.OauthWebClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class KakaoOauthClient implements OauthClient {

    private static final String PROVIDER_NAME = "kakao";

    private final OauthWebClient oauthWebClient;

    @Value("${oauth2.oauth-properties.kakao.client-id}")
    private String clientId;

    @Value("${oauth2.oauth-properties.kakao.client-secret}")
    private String clientSecret;

    @Value("${oauth2.oauth-properties.kakao.redirect-uri}")
    private String redirectUri;

    @Value("${oauth2.oauth-properties.kakao.token-uri}")
    private String tokenUri;

    @Value("${oauth2.oauth-properties.kakao.user-info-uri}")
    private String userInfoUri;

    @Override
    public OauthTokenResponse requestOauthToken(String code) {
        return oauthWebClient.requestOauthToken(tokenUri, setupFormData(code));
    }

    private MultiValueMap<String, String> setupFormData(String code) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("code", URLDecoder.decode(code, StandardCharsets.UTF_8));
        formData.add("grant_type", "authorization_code");
        formData.add("redirect_uri", redirectUri);
        return formData;
    }

    @Override
    public Map<String, Object> requestOauthUserInfo(String accessToken) {
        return oauthWebClient.requestOauthUserInfo(userInfoUri, accessToken);
    }

    @Override
    public String getProviderName() {
        return PROVIDER_NAME;
    }
}
