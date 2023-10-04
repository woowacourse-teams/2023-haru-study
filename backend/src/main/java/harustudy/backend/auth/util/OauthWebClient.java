package harustudy.backend.auth.util;

import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.exception.OauthServerException;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;

@Component
public class OauthWebClient {

    public OauthTokenResponse requestOauthToken(String tokenUri, MultiValueMap<String, String> body) {
        return WebClient.create()
                .post()
                .uri(tokenUri)
                .headers(header -> {
                    header.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
                    header.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
                    header.setAcceptCharset(Collections.singletonList(StandardCharsets.UTF_8));
                })
                .bodyValue(body)
                .retrieve()
                .onStatus(HttpStatusCode::isError,
                        response -> response.bodyToMono(String.class)
                                .map(OauthServerException::new))
                .bodyToMono(OauthTokenResponse.class)
                .block();
    }

    public Map<String, Object> requestOauthUserInfo(String userInfoUri, String accessToken) {
        return WebClient.create()
                .get()
                .uri(userInfoUri)
                .headers(header -> header.setBearerAuth(accessToken))
                .retrieve()
                .onStatus(HttpStatusCode::isError,
                        response -> response.bodyToMono(String.class)
                                .map(OauthServerException::new))
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {
                })
                .block();
    }
}
