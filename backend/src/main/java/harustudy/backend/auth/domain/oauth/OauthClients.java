package harustudy.backend.auth.domain.oauth;

import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.exception.InvalidProviderNameException;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OauthClients {

    private final List<OauthClient> oauthClients;

    public OauthTokenResponse requestOauthToken(String oauthProvider, String code) {
        OauthClient oauthClient = selectClientSupports(oauthProvider);
        return oauthClient.requestOauthToken(code);
    }


    public Map<String, Object> requestOauthUserInfo(String oauthProvider, String accessToken) {
        OauthClient oauthClient = selectClientSupports(oauthProvider);
        return oauthClient.requestOauthUserInfo(accessToken);
    }

    private OauthClient selectClientSupports(String oauthProvider) {
        return oauthClients.stream()
                .filter(oauthClient -> oauthClient.supports(oauthProvider))
                .findAny()
                .orElseThrow(InvalidProviderNameException::new);
    }
}
