package harustudy.backend.auth.service;

import harustudy.backend.auth.config.OauthProperties;
import harustudy.backend.auth.config.OauthProperty;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.domain.OauthMember;
import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.domain.SocialType;
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
        RefreshToken refreshToken = saveRefreshToken(oauthMember);
        return new TokenResponse(accessToken, refreshToken.getUuid());
    }

    private UserInfo requestUserInfo(String oauthProvider, String code) {
        OauthProperty oauthProperty = oauthProperties.get(oauthProvider);
        OauthTokenResponse oauthToken = googleOauthClient.requestOauthToken(code, oauthProperty);
        Map<String, Object> oauthUserInfo = googleOauthClient.requestOauthUserInfo(oauthProperty, oauthToken);
        return OauthUserInfoExtractor.extract(oauthProvider, oauthUserInfo);
    }

    private String generateAccessToken(Long memberId) {
        return jwtTokenProvider.builder()
                .subject(String.valueOf(memberId))
                .accessTokenExpireLength(tokenConfig.accessTokenExpireLength())
                .secretKey(tokenConfig.secretKey())
                .build();
    }

    private RefreshToken saveRefreshToken(OauthMember oauthMember) {
        RefreshToken refreshToken = new RefreshToken(oauthMember, tokenConfig.refreshTokenExpireLength());
        refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    private OauthMember saveOrUpdateOauthMember(String oauthProvider, UserInfo userInfo) {
        OauthMember oauthMember = oauthMemberRepository.findByEmail(userInfo.email())
                .map(entity -> entity.update(userInfo.email(), userInfo.name(), userInfo.imageUrl()))
                .orElseGet(() -> userInfo.toOauthMember(SocialType.from(oauthProvider)));
        return oauthMemberRepository.save(oauthMember);
    }

    public TokenResponse guestLogin() {
        OauthMember oauthMember = OauthMember.guest();
        oauthMemberRepository.save(oauthMember);
        String accessToken = generateGuestAccessToken(oauthMember.getId());
        return new TokenResponse(accessToken, null);
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
                .orElseThrow(InvalidRefreshTokenException::new); // TODO: handle 400
        refreshToken.validateExpired();
        refreshToken.regenerate(tokenConfig.refreshTokenExpireLength());
        String accessToken = generateAccessToken(refreshToken.getOauthMember().getId());
        return new TokenResponse(accessToken, refreshToken.getUuid());
    }
}
