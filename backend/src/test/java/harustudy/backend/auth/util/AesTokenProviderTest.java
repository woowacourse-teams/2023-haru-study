package harustudy.backend.auth.util;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.exception.InvalidAccessTokenException;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
class AesTokenProviderTest {

    @Autowired
    private AesTokenProvider aesTokenProvider;

    @Autowired
    private TokenConfig tokenConfig;

    @Test
    void 액세스_토큰을_생성한다() {
        // given
        Long memberId = 1L;

        // when
        String accessToken = aesTokenProvider.createAccessToken(memberId,
                tokenConfig.accessTokenExpireLength(), tokenConfig.secretKey());

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(accessToken.length()).isGreaterThan(0);
            softly.assertThat(aesTokenProvider.parseSubject(accessToken, tokenConfig.secretKey()))
                    .isEqualTo(memberId);
        });
    }

    @Test
    void 복호화되지_않는_액세스_토큰을_검증하면_예외를_던진다() {
        // given
        String invalidAccessToken = "invalid-access-token";

        // when, then
        assertThatThrownBy(() -> aesTokenProvider.parseSubject(invalidAccessToken,
                tokenConfig.secretKey()))
                .isInstanceOf(InvalidAccessTokenException.class);
    }

    @Test
    void 만료된_액세스_토큰을_검증하면_예외를_던진다() {
        // given
        Long memberId = 1L;
        String expiredAccessToken = aesTokenProvider.createAccessToken(memberId, -1L,
                tokenConfig.secretKey());

        // when, then
        assertThatThrownBy(() -> aesTokenProvider.parseSubject(expiredAccessToken,
                tokenConfig.secretKey()))
                .isInstanceOf(InvalidAccessTokenException.class);
    }
}
