package harustudy.backend.auth.util;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import harustudy.backend.auth.config.TokenConfig;
import io.jsonwebtoken.JwtException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
class JwtTokenProviderTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenConfig tokenConfig;

    @Test
    void 액세스_토큰을_생성한다() {
        // given
        String subject = "1L";

        // when
        String accessToken = jwtTokenProvider.createAccessToken(subject,
                tokenConfig.accessTokenExpireLength(), tokenConfig.secretKey());

        // then
        assertThat(jwtTokenProvider.parseSubject(accessToken, tokenConfig.secretKey())).isEqualTo(
                subject);
    }

    @Test
    void 올바르지_않은_액세스_토큰을_검증하면_예외를_던진다() {
        // given
        String invalidAccessToken = "invalid-access-token";

        // when, then
        assertThatThrownBy(() -> jwtTokenProvider.validateAccessToken(invalidAccessToken,
                tokenConfig.secretKey()))
                .isInstanceOf(JwtException.class);
    }
}
