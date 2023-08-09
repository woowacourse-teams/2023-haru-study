package harustudy.backend.auth.infrastructure;

import harustudy.backend.auth.config.OauthProperty;
import harustudy.backend.auth.dto.OauthTokenResponse;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class GoogleOauthClient {

    public OauthTokenResponse requestOauthToken(String code, OauthProperty oauthProperty) {
        return WebClient.create()
                .post()
                .uri(oauthProperty.getTokenUri())
                .headers(header -> {
                    header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                    header.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
                    header.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
                })
                .bodyValue(setupFormData(code, oauthProperty))
                .retrieve()
                .bodyToMono(OauthTokenResponse.class)
                .log()
                .block();
    }

    private MultiValueMap<String, String> setupFormData(String code, OauthProperty oauthProperty) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", oauthProperty.getClientId());
        formData.add("client_secret", oauthProperty.getClientSecret());
        formData.add("code", URLDecoder.decode(code, StandardCharsets.UTF_8));
        formData.add("grant_type", "authorization_code");
        formData.add("redirect_uri", oauthProperty.getRedirectUri());
        return formData;
    }

    public Map<String, Object> requestOauthUserInfo(OauthProperty oauthProperty,
            OauthTokenResponse oauthTokenResponse) {
        return WebClient.create()
                .get()
                .uri(oauthProperty.getUserInfoUri())
                .headers(header -> header.setBearerAuth(oauthTokenResponse.accessToken()))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .log()
                .block();
    }
}
