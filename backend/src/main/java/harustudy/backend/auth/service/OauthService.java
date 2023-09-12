package harustudy.backend.auth.service;

import harustudy.backend.auth.config.OauthProperties;
import harustudy.backend.auth.config.OauthProperty;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.infrastructure.GoogleOauthClient;
import harustudy.backend.auth.util.OauthUserInfoExtractor;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class OauthService {

    private final OauthProperties oauthProperties;
    private final GoogleOauthClient googleOauthClient;
    private final AuthService authService;

    public TokenResponse oauthLogin(OauthLoginRequest request) {
        UserInfo userInfo = requestUserInfo(request.oauthProvider(), request.code());
        return authService.userLogin(request, userInfo);
    }

    private UserInfo requestUserInfo(String oauthProvider, String code) {
        OauthProperty oauthProperty = oauthProperties.get(oauthProvider);
        OauthTokenResponse oauthToken = googleOauthClient.requestOauthToken(code, oauthProperty);
        Map<String, Object> oauthUserInfo =
                googleOauthClient.requestOauthUserInfo(oauthProperty, oauthToken.accessToken());
        return OauthUserInfoExtractor.extract(oauthProvider, oauthUserInfo);
    }
}
