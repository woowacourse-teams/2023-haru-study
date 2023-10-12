package harustudy.backend.auth.dto;

import harustudy.backend.auth.exception.UserInfoFormatException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class UserInfoTest {

    @Test
    void 파라미터가_없는_경우_예외를_던진다() {
        // given, when, then
        assertThatThrownBy(() -> UserInfo.builder()
                .name(null)
                .email(null)
                .imageUrl(null)
                .build())
                .isInstanceOf(UserInfoFormatException.class);
    }
}
