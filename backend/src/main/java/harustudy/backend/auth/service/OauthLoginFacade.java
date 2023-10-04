package harustudy.backend.auth.service;

import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.domain.oauth.OauthClient;
import harustudy.backend.auth.util.OauthUserInfoExtractor;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OauthLoginFacade {

    private final OauthClient oauthClient;
    private final AuthService authService;

    public TokenResponse oauthLogin(OauthLoginRequest request) {
        UserInfo userInfo = requestUserInfo(request.oauthProvider(), request.code());
        return authService.userLogin(request, userInfo);
    }

    private UserInfo requestUserInfo(String oauthProvider, String code) {
        OauthTokenResponse oauthToken = oauthClient.requestOauthToken(code, oauthProvider);
        Map<String, Object> oauthUserInfo =
                oauthClient.requestOauthUserInfo(oauthToken.accessToken(), oauthProvider);
        return OauthUserInfoExtractor.extract(oauthProvider, oauthUserInfo);
    }
}
