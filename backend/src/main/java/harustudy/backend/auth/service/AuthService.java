package harustudy.backend.auth.service;

import harustudy.backend.auth.config.OauthProperties;
import harustudy.backend.auth.config.OauthProperty;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.RefreshTokenRequest;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.exception.InvalidRefreshTokenException;
import harustudy.backend.auth.infrastructure.GoogleOauthClient;
import harustudy.backend.auth.repository.RefreshTokenRepository;
import harustudy.backend.auth.util.JwtTokenProvider;
import harustudy.backend.auth.util.OauthUserInfoExtractor;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
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
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public TokenResponse oauthLogin(OauthLoginRequest request) {
        UserInfo userInfo = requestUserInfo(request.oauthProvider(), request.code());
        Member member = saveOrUpdateMember(request.oauthProvider(), userInfo); // TODO: 트랜잭션 분리
        String accessToken = generateAccessToken(member.getId());
        RefreshToken refreshToken = saveRefreshTokenOf(member);
        return TokenResponse.forLoggedIn(accessToken, refreshToken);
    }

    private UserInfo requestUserInfo(String oauthProvider, String code) {
        OauthProperty oauthProperty = oauthProperties.get(oauthProvider);
        OauthTokenResponse oauthToken = googleOauthClient.requestOauthToken(code, oauthProperty);
        Map<String, Object> oauthUserInfo =
                googleOauthClient.requestOauthUserInfo(oauthProperty, oauthToken.accessToken());
        return OauthUserInfoExtractor.extract(oauthProvider, oauthUserInfo);
    }

    private Member saveOrUpdateMember(String oauthProvider, UserInfo userInfo) {
        Member member = memberRepository.findByEmail(userInfo.email())
                .map(entity -> entity.updateUserInfo(userInfo.email(), userInfo.name(), userInfo.imageUrl()))
                .orElseGet(() -> userInfo.toMember(LoginType.from(oauthProvider)));
        return memberRepository.save(member);
    }

    private String generateAccessToken(Long memberId) {
        return jwtTokenProvider.builder()
                .subject(String.valueOf(memberId))
                .accessTokenExpireLength(tokenConfig.accessTokenExpireLength())
                .secretKey(tokenConfig.secretKey())
                .build();
    }

    private RefreshToken saveRefreshTokenOf(Member member) {
        RefreshToken refreshToken = new RefreshToken(member, tokenConfig.refreshTokenExpireLength());
        refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    public TokenResponse guestLogin() {
        Member member = Member.guest();
        memberRepository.save(member);
        String accessToken = generateGuestAccessToken(member.getId());
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
        String accessToken = generateAccessToken(refreshToken.getMember().getId());
        return TokenResponse.forLoggedIn(accessToken, refreshToken);
    }

    public void validateAccessToken(String accessToken) {
        jwtTokenProvider.validateAccessToken(accessToken, tokenConfig.secretKey());
    }

    public String parseMemberId(String accessToken) {
        return jwtTokenProvider.parseSubject(accessToken, tokenConfig.secretKey());
    }
}
