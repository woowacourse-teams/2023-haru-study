package harustudy.backend.auth.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.domain.oauth.OauthClients;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.exception.InvalidAccessTokenException;
import harustudy.backend.auth.util.AesTokenProvider;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Map;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class AuthServiceTest {

    @Autowired
    private OauthLoginFacade oauthLoginFacade;

    @Autowired
    private AuthService authService;

    @Autowired
    private AesTokenProvider aesTokenProvider;

    @Autowired
    private TokenConfig tokenConfig;

    @PersistenceContext
    private EntityManager entityManager;

    @MockBean
    private OauthClients oauthClients;

    @Test
    void 구글_로그인시_멤버가_저장되고_멤버_아이디의_액세스_토큰과_갱신_토큰을_반환한다() {
        // given
        OauthLoginRequest request = new OauthLoginRequest("google", "google-code");
        UserInfo userInfo = new UserInfo("test", "test@test.com", "test.png");

        given(oauthClients.requestOauthToken(any(String.class), any(String.class)))
                .willReturn(new OauthTokenResponse("Bearer", "google-access-token", "scope"));
        given(oauthClients.requestOauthUserInfo(any(String.class), any(String.class)))
                .willReturn(Map.of("name", userInfo.name(), "email", userInfo.email(), "picture",
                        userInfo.imageUrl()));

        // when
        TokenResponse response = oauthLoginFacade.oauthLogin(request);

        // then
        Long memberId = authService.parseMemberId(response.accessToken());
        Member foundMember = entityManager.find(Member.class, memberId);

        assertSoftly(softly -> {
            softly.assertThat(response.accessToken()).isNotNull();
            softly.assertThat(response.refreshToken()).isNotNull();
            softly.assertThat(foundMember.getName()).isEqualTo(userInfo.name());
            softly.assertThat(foundMember.getEmail()).isEqualTo(userInfo.email());
            softly.assertThat(foundMember.getImageUrl()).isEqualTo(userInfo.imageUrl());
            softly.assertThat(foundMember.getLoginType()).isEqualTo(LoginType.GOOGLE);
        });
    }

    @Test
    void 게스트_로그인시_멤버가_저장되고_멤버_아이디의_액세스_토큰을_반환한다() {
        // when
        TokenResponse response = authService.guestLogin();

        // then
        Long memberId = authService.parseMemberId(response.accessToken());
        Member foundMember = entityManager.find(Member.class, memberId);

        assertSoftly(softly -> {
            softly.assertThat(response.accessToken()).isNotNull();
            softly.assertThat(foundMember).isNotNull();
        });
    }

    @Test
    void 갱신_토큰을_갱신한다() {
        // given
        Member member = new Member("test", "test@test.com", "test.png", LoginType.GOOGLE);
        RefreshToken refreshToken = new RefreshToken(member,
                tokenConfig.refreshTokenExpireLength());

        entityManager.persist(member);
        entityManager.persist(refreshToken);
        entityManager.flush();
        entityManager.clear();

        // when
        TokenResponse response = authService.refresh(refreshToken.getUuid().toString());

        // then
        assertThat(response.refreshToken()).isNotEqualTo(refreshToken.getUuid());
    }

    @Test
    void 유효한_액세스_토큰의_유효성_검사_시_예외를_반환하지_않는다() {
        // given
        Long memberId = 1L;
        String accessToken = aesTokenProvider.createAccessToken(memberId, 999999L,
                tokenConfig.secretKey());

        // when, then
        assertDoesNotThrow(() -> authService.parseMemberId(accessToken));
    }

    @Test
    void 만료된_액세스_토큰의_유효성_검사_시_예외를_반환한다() {
        // given
        Long memberId = 1L;
        String accessToken = aesTokenProvider.createAccessToken(memberId, -1L,
                tokenConfig.secretKey());

        // when, then
        assertThatThrownBy(() -> authService.parseMemberId(accessToken)).isInstanceOf(
                InvalidAccessTokenException.class);
    }

    @Test
    void 갱신_토큰을_삭제한다() {
        // given
        Member member = new Member("test", "test@test.com", "test.png", LoginType.GOOGLE);
        RefreshToken refreshToken = new RefreshToken(member,
                tokenConfig.refreshTokenExpireLength());

        entityManager.persist(member);
        entityManager.persist(refreshToken);
        entityManager.flush();
        entityManager.clear();

        // when
        String stringifiedUUID = refreshToken.getUuid().toString();

        // then
        assertNotNull(entityManager.find(RefreshToken.class, refreshToken.getId()));
        authService.deleteStringifiedRefreshToken(stringifiedUUID);
        entityManager.clear();
        assertNull(entityManager.find(RefreshToken.class, refreshToken.getId()));
    }

    @Test
    void 이메일은_같지만_프로바이더가_다른_경우는_신규_로그인으로_인식한다() {
        // given
        Member googleLoginMember = new Member("test", "test@test.com", "imageUrl", LoginType.GOOGLE);
        entityManager.persist(googleLoginMember);

        entityManager.flush();
        entityManager.clear();

        OauthLoginRequest request = new OauthLoginRequest("kakao", "kakao-code");
        UserInfo userInfo = new UserInfo("test", "test@test.com", "test.png");

        given(oauthClients.requestOauthToken(any(), any()))
                .willReturn(new OauthTokenResponse("tokenType", "accessToken", "scope"));
        given(oauthClients.requestOauthUserInfo(any(), any()))
                .willReturn(Map.of("nickname", userInfo.name(), "email", userInfo.email(), "profile_image_url", userInfo.imageUrl()));

        // when
        TokenResponse tokenResponse = oauthLoginFacade.oauthLogin(request);
        Long memberId = authService.parseMemberId(tokenResponse.accessToken());

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(tokenResponse.accessToken()).isNotNull();
            softly.assertThat(tokenResponse.refreshToken()).isNotNull();
            softly.assertThat(googleLoginMember.getId()).isNotEqualTo(memberId);
        });
    }
}
