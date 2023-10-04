package harustudy.backend.auth.domain.oauth;

import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.exception.InvalidProviderNameException;
import harustudy.backend.auth.util.OauthProviderManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Component(value = "oauthClient")
public class CompositeOauthClient implements OauthClient {

    private final List<OauthClient> oauthClients;

    @Override
    public OauthTokenResponse requestOauthToken(String code) {
        String providerName = OauthProviderManager.getCurrentProviderName();
        return getClient(providerName)
                .requestOauthToken(code);
    }

    @Override
    public Map<String, Object> requestOauthUserInfo(String accessToken) {
        String providerName = OauthProviderManager.getCurrentProviderName();
        return getClient(providerName)
                .requestOauthUserInfo(accessToken);
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
