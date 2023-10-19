package harustudy.backend.auth.domain.oauth;

import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.util.OauthWebClient;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@RequiredArgsConstructor
@Component
public class GoogleOauthClient implements OauthClient {

    private static final String PROVIDER_NAME = "google";

    private final OauthWebClient oauthWebClient;

    @Value("${oauth2.oauth-properties.google.client-id}")
    private String clientId;

    @Value("${oauth2.oauth-properties.google.client-secret}")
    private String clientSecret;

    @Value("${oauth2.oauth-properties.google.redirect-uri}")
    private String redirectUri;

    @Value("${oauth2.oauth-properties.google.token-uri}")
    private String tokenUri;

    @Value("${oauth2.oauth-properties.google.user-info-uri}")
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
    public boolean supports(String oauthClient) {
        return oauthClient.equals(PROVIDER_NAME);
    }
}
