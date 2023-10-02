package harustudy.backend.auth.infrastructure;

import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.util.OauthWebClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Component
public class KakaoOauthClient implements OauthClient {

    private static final Map<String, List<String>> USER_INFO_PARAMETER = Map.of("property_keys",
            List.of("kakao_account.profile", "kakao_account.email"));
    private static final String PROVIDER_NAME = "kakao";

    private final OauthWebClient oauthWebClient;

    @Value("${oauth2.oauth-properties.kakao.client-id}")
    private String clientId;

    @Value("${oauth2.oauth-properties.kakao.redirect-uri}")
    private String redirectUri;

    @Value("${oauth2.oauth-properties.kakao.token-uri}")
    private String tokenUri;

    @Value("${oauth2.oauth-properties.kakao.user-info-uri}")
    private String userInfoUri;

    public KakaoOauthClient(OauthWebClient oauthWebClient) {
        this.oauthWebClient = oauthWebClient;
    }

    @Override
    public OauthTokenResponse requestOauthToken(String code, String providerName) {
        return oauthWebClient.requestOauthToken(tokenUri, setupFormData(code));
    }

    private MultiValueMap<String, String> setupFormData(String code) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId);
        formData.add("code", URLDecoder.decode(code, StandardCharsets.UTF_8));
        formData.add("grant_type", "authorization_code");
        formData.add("redirect_uri", redirectUri);
        return formData;
    }

    @Override
    public Map<String, Object> requestOauthUserInfo(String accessToken, String providerName) {
        return oauthWebClient.requestOauthUserInfo(userInfoUri, accessToken, USER_INFO_PARAMETER);
    }

    @Override
    public Boolean supports(String providerName) {
        return PROVIDER_NAME.equals(providerName);
    }
}
