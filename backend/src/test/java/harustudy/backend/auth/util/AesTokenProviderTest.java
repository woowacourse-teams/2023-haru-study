package harustudy.backend.auth.util;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.auth.exception.InvalidAccessTokenException;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class AesTokenProviderTest {

    private final AesTokenProvider aesTokenProvider = new AesTokenProvider(new ObjectMapper());

    @Test
    void 액세스_토큰을_생성한다() {
        // given
        Long memberId = 1L;
        String secretKey = "12345678901234567890123456789012";
        Long accessTokenExpireLength = 12345L;

        // when
        String accessToken = aesTokenProvider.createAccessToken(memberId,
                accessTokenExpireLength, secretKey);

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(accessToken.length()).isGreaterThan(0);
            softly.assertThat(aesTokenProvider.parseSubject(accessToken, secretKey))
                    .isEqualTo(memberId);
        });
    }

    @Test
    void 복호화되지_않는_액세스_토큰을_검증하면_예외를_던진다() {
        // given
        String invalidAccessToken = "invalid-access-token";
        String secretKey = "12345678901234567890123456789012";

        // when, then
        assertThatThrownBy(() -> aesTokenProvider.parseSubject(invalidAccessToken, secretKey))
                .isInstanceOf(InvalidAccessTokenException.class);
    }

    @Test
    void 만료된_액세스_토큰을_검증하면_예외를_던진다() {
        // given
        Long memberId = 1L;
        String secretKey = "12345678901234567890123456789012";
        String expiredAccessToken = aesTokenProvider.createAccessToken(memberId, -1L,
                secretKey);

        // when, then
        assertThatThrownBy(() -> aesTokenProvider.parseSubject(expiredAccessToken, secretKey))
                .isInstanceOf(InvalidAccessTokenException.class);
    }
}
