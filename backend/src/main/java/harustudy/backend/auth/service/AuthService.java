package harustudy.backend.auth.service;

import harustudy.backend.auth.config.OauthProperties;
import harustudy.backend.auth.config.OauthProperty;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.domain.OauthMember;
import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.domain.LoginType;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.RefreshTokenRequest;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.exception.InvalidRefreshTokenException;
import harustudy.backend.auth.infrastructure.GoogleOauthClient;
import harustudy.backend.auth.repository.OauthMemberRepository;
import harustudy.backend.auth.repository.RefreshTokenRepository;
import harustudy.backend.auth.util.JwtTokenProvider;
import harustudy.backend.auth.util.OauthUserInfoExtractor;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class AuthService {

    private final OauthProperties oauthProperties;
    private final GoogleOauthClient googleOauthClient;
    private final JwtTokenProvider jwtTokenProvider;
    private final TokenConfig tokenConfig;
    private final OauthMemberRepository oauthMemberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public TokenResponse oauthLogin(OauthLoginRequest request) {
        UserInfo userInfo = requestUserInfo(request.oauthProvider(), request.code());
        OauthMember oauthMember = saveOrUpdateOauthMember(request.oauthProvider(), userInfo); // TODO: 트랜잭션 분리
        String accessToken = generateAccessToken(oauthMember.getId());
        RefreshToken refreshToken = saveRefreshTokenOf(oauthMember);
        return TokenResponse.forLoggedIn(accessToken, refreshToken);
    }

    private UserInfo requestUserInfo(String oauthProvider, String code) {
        OauthProperty oauthProperty = oauthProperties.get(oauthProvider);
        OauthTokenResponse oauthToken = googleOauthClient.requestOauthToken(code, oauthProperty);
        Map<String, Object> oauthUserInfo =
                googleOauthClient.requestOauthUserInfo(oauthProperty, oauthToken.accessToken());
        return OauthUserInfoExtractor.extract(oauthProvider, oauthUserInfo);
    }

    private OauthMember saveOrUpdateOauthMember(String oauthProvider, UserInfo userInfo) {
        OauthMember oauthMember = oauthMemberRepository.findByEmail(userInfo.email())
                .map(entity -> entity.updateUserInfo(userInfo.email(), userInfo.name(), userInfo.imageUrl()))
                .orElseGet(() -> userInfo.toOauthMember(LoginType.from(oauthProvider)));
        return oauthMemberRepository.save(oauthMember);
    }

    private String generateAccessToken(Long memberId) {
        return jwtTokenProvider.builder()
                .subject(String.valueOf(memberId))
                .accessTokenExpireLength(tokenConfig.accessTokenExpireLength())
                .secretKey(tokenConfig.secretKey())
                .build();
    }

    private RefreshToken saveRefreshTokenOf(OauthMember oauthMember) {
        RefreshToken refreshToken = new RefreshToken(oauthMember, tokenConfig.refreshTokenExpireLength());
        refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public TokenResponse guestLogin() {
        OauthMember oauthMember = OauthMember.guest();
        oauthMemberRepository.save(oauthMember);
        String accessToken = generateGuestAccessToken(oauthMember.getId());
        return TokenResponse.forGuest(accessToken);
    }

    private String generateGuestAccessToken(Long memberId) {
        return jwtTokenProvider.builder()
                .subject(String.valueOf(memberId))
                .accessTokenExpireLength(tokenConfig.guestAccessTokenExpireLength())
                .secretKey(tokenConfig.secretKey())
                .build();
    }

    public TokenResponse refresh(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByUuid(request.refreshTokenUuid())
                .orElseThrow(InvalidRefreshTokenException::new);
        refreshToken.validateExpired();
        refreshToken.updateUuidAndExpireDateTime(tokenConfig.refreshTokenExpireLength());
        String accessToken = generateAccessToken(refreshToken.getOauthMember().getId());
        return TokenResponse.forLoggedIn(accessToken, refreshToken);
    }
}
