package harustudy.backend.auth.service;

import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.exception.InvalidAccessTokenException;
import harustudy.backend.auth.exception.InvalidRefreshTokenException;
import harustudy.backend.auth.repository.RefreshTokenRepository;
import harustudy.backend.auth.util.JwtTokenProvider;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import io.jsonwebtoken.JwtException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final TokenConfig tokenConfig;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public TokenResponse userLogin(OauthLoginRequest request, UserInfo userInfo) {
        Member member = saveOrUpdateMember(request.oauthProvider(), userInfo);
        String accessToken = generateAccessToken(member.getId());
        RefreshToken refreshToken = saveRefreshTokenOf(member);
        return TokenResponse.forLoggedIn(accessToken, refreshToken);
    }

    private Member saveOrUpdateMember(String oauthProvider, UserInfo userInfo) {
        Member member = memberRepository.findByEmail(userInfo.email())
                .map(entity -> entity.updateUserInfo(userInfo.name(), userInfo.email(), userInfo.imageUrl()))
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
        RefreshToken refreshToken = refreshTokenRepository.findByMember(member)
                .map(entity -> entity.updateExpireDateTime(tokenConfig.refreshTokenExpireLength()))
                .orElseGet(() -> new RefreshToken(member, tokenConfig.refreshTokenExpireLength()));
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

    public TokenResponse refresh(String refreshTokenRequest) {
        RefreshToken refreshToken = refreshTokenRepository.findByUuid(UUID.fromString(refreshTokenRequest))
                .orElseThrow(InvalidRefreshTokenException::new);
        refreshToken.validateExpired();
        refreshToken.updateUuidAndExpireDateTime(tokenConfig.refreshTokenExpireLength());
        String accessToken = generateAccessToken(refreshToken.getMember().getId());
        return TokenResponse.forLoggedIn(accessToken, refreshToken);
    }

    public void validateAccessToken(String accessToken) {
        try {
            jwtTokenProvider.validateAccessToken(accessToken, tokenConfig.secretKey());
        } catch (JwtException e) {
            throw new InvalidAccessTokenException();
        }
    }

    public String parseMemberId(String accessToken) {
        return jwtTokenProvider.parseSubject(accessToken, tokenConfig.secretKey());
    }
}
