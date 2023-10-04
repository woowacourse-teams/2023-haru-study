package harustudy.backend.auth.infrastructure;

import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.exception.InvalidProviderNameException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component(value = "oauthClient")
public class CompositeOauthClient implements OauthClient {

    private final List<OauthClient> oauthClients;

    @Override
    public OauthTokenResponse requestOauthToken(String code, String providerName) {
        return getClient(providerName)
                .requestOauthToken(code, providerName);
    }

    @Override
    public Map<String, Object> requestOauthUserInfo(String accessToken, String providerName) {
        return getClient(providerName)
                .requestOauthUserInfo(accessToken, providerName);
    }

    private OauthClient getClient(String providerName) {
        return oauthClients.stream()
                .filter(client -> client.supports(providerName))
                .findAny()
                .orElseThrow(InvalidProviderNameException::new);
    }

    @Override
    public Boolean supports(String providerName) {
        return oauthClients.stream()
                .anyMatch(client -> client.supports(providerName));
    }
}
