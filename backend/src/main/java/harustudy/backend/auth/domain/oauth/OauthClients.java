package harustudy.backend.auth.domain.oauth;

import harustudy.backend.auth.dto.OauthTokenResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class OauthClients {

    private final Map<String, OauthClient> clientMappings;

    public OauthClients(List<OauthClient> clientMappings) {
        this.clientMappings = clientMappings.stream()
                .collect(Collectors.toMap(OauthClient::getProviderName, Function.identity()));
    }

    public OauthTokenResponse requestOauthToken(String oauthProvider, String code) {
        return clientMappings.get(oauthProvider)
                .requestOauthToken(code);
    }

    public Map<String, Object> requestOauthUserInfo(String oauthProvider, String accessToken) {
        return clientMappings.get(oauthProvider)
                .requestOauthUserInfo(accessToken);
    }
}
