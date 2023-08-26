package harustudy.backend.auth.util;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import harustudy.backend.auth.dto.UserInfo;
import harustudy.backend.auth.exception.InvalidProviderNameException;
import java.util.Map;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class OauthUserInfoExtractorTest {

    @Test
    void 구글_프로바이더의_사용자_정보를_추출한다() {
        // given
        String providerName = "google";
        UserInfo userInfo = new UserInfo("test", "test@test.com", "test.png");
        Map<String, Object> attributes = Map.of(
                "name", userInfo.name(),
                "email", userInfo.email(),
                "picture", userInfo.imageUrl()
        );

        // when
        UserInfo result = OauthUserInfoExtractor.extract(providerName, attributes);

        // then
        assertSoftly(softly -> {
            softly.assertThat(result.name()).isEqualTo(userInfo.name());
            softly.assertThat(result.email()).isEqualTo(userInfo.email());
            softly.assertThat(result.imageUrl()).isEqualTo(userInfo.imageUrl());
        });
    }

    @Test
    void 올바르지_않은_프로바이더_이름은_예외를_던진다() {
        // given
        String providerName = "invalidProviderName";
        UserInfo userInfo = new UserInfo("test", "test@test.com", "test.png");
        Map<String, Object> attributes = Map.of(
                "name", userInfo.name(),
                "email", userInfo.email(),
                "picture", userInfo.imageUrl()
        );

        // when, then
        assertThatThrownBy(() -> OauthUserInfoExtractor.extract(providerName, attributes))
                .isInstanceOf(InvalidProviderNameException.class);
    }
}