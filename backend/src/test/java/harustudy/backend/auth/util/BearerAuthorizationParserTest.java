package harustudy.backend.auth.util;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import harustudy.backend.auth.exception.InvalidAuthorizationHeaderException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
class BearerAuthorizationParserTest {

    @Autowired
    private BearerAuthorizationParser bearerAuthorizationParser;

    @Test
    void 인증_헤더에서_액세스_토큰을_파싱한다() {
        // given
        String tokenType = "Bearer";
        String accessToken = "access-token";
        String authorizationHeader = tokenType + " " + accessToken;

        // when
        String parsed = bearerAuthorizationParser.parse(authorizationHeader);

        // then
        assertThat(parsed).isEqualTo(accessToken);
    }

    @Test
    void 인증_헤더가_없으면_예외를_던진다() {
        // when, then
        assertThatThrownBy(() -> bearerAuthorizationParser.parse(null))
                .isInstanceOf(InvalidAuthorizationHeaderException.class);
    }

    @Test
    void 인증_헤더의_형식이_올바르지_않으면_예외를_던진다() {
        // given
        String tokenType = "Basic";
        String email = "haru-study@harustudy.com:harustudy";
        String authorizationHeader = tokenType + " " + email;

        // given
        assertThatThrownBy(() -> bearerAuthorizationParser.parse(authorizationHeader))
                .isInstanceOf(InvalidAuthorizationHeaderException.class);
    }
}
