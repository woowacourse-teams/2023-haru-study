package harustudy.backend.auth.service;

import harustudy.backend.auth.domain.oauth.OauthClients;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.util.OauthUserInfoExtractor;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OauthLoginFacade {

    private final OauthClients oauthClients;
    private final AuthService authService;

    public TokenResponse oauthLogin(OauthLoginRequest request) {
        UserInfo userInfo = requestUserInfo(request.oauthProvider(), request.code());
        return authService.userLogin(request, userInfo);
    }

    private UserInfo requestUserInfo(String oauthProvider, String code) {
        OauthTokenResponse oauthToken = oauthClients.requestOauthToken(oauthProvider, code);
        Map<String, Object> oauthUserInfo =
                oauthClients.requestOauthUserInfo(oauthProvider, oauthToken.accessToken());
        return OauthUserInfoExtractor.extract(oauthProvider, oauthUserInfo);
    }
}
