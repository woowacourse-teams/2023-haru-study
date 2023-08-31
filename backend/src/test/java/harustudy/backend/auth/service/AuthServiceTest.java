package harustudy.backend.auth.service;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import harustudy.backend.auth.config.OauthProperty;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.infrastructure.GoogleOauthClient;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Map;
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
    private AuthService authService;

    @Autowired
    private TokenConfig tokenConfig;

    @PersistenceContext
    private EntityManager entityManager;

    @MockBean
    private GoogleOauthClient googleOauthClient;

    @Test
    void 구글_로그인시_멤버가_저장되고_멤버_아이디의_액세스_토큰과_갱신_토큰을_반환한다() {
        // given
        OauthLoginRequest request = new OauthLoginRequest("google", "google-code");
        UserInfo userInfo = new UserInfo("test", "test@test.com", "test.png");

        given(googleOauthClient.requestOauthToken(any(String.class), any(OauthProperty.class)))
                .willReturn(new OauthTokenResponse("Bearer", "google-access-token", "scope"));
        given(googleOauthClient.requestOauthUserInfo(any(OauthProperty.class), any(String.class)))
                .willReturn(Map.of("name", userInfo.name(), "email", userInfo.email(), "picture",
                        userInfo.imageUrl()));

        // when
        TokenResponse response = authService.oauthLogin(request);

        // then
        String memberId = authService.parseMemberId(response.accessToken());
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
        String memberId = authService.parseMemberId(response.accessToken());
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
}
