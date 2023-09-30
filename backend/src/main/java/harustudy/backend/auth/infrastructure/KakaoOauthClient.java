package harustudy.backend.auth.infrastructure;

import harustudy.backend.auth.dto.OauthTokenResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component
public class KakaoOauthClient implements OauthClient {

    public static final Map<String, List<String>> USER_INFO_PARAMETER = Map.of("property_keys",
            List.of("kakao_account.profile", "kakao_account.email"));
    private static final String PROVIDER_NAME = "kakao";

    @Value("${oauth2.oauth-properties.kakao.client-id}")
    private String clientId;

    @Value("${oauth2.oauth-properties.kakao.redirect-uri}")
    private String redirectUri;

    @Value("${oauth2.oauth-properties.kakao.token-uri}")
    private String tokenUri;

    @Value("${oauth2.oauth-properties.kakao.user-info-uri}")
    private String userInfoUri;

    @Override
    public OauthTokenResponse requestOauthToken(String code, String providerName) {
        return WebClient.create()
                .post()
                .uri(tokenUri)
                .headers(header -> {
                    header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                    header.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
                    header.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
                })
                .bodyValue(setupFormData(code))
                .retrieve()
                .bodyToMono(OauthTokenResponse.class)
                .block();
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
        return WebClient.create()
                .get()
                .uri(userInfoUri, USER_INFO_PARAMETER)
                .headers(header -> header.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .block();
    }

    @Override
    public Boolean supports(String providerName) {
        return PROVIDER_NAME.equals(providerName);
    }
}
