package harustudy.backend.member.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.member.exception.MemberNameLengthException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class MemberTest {

    @ParameterizedTest
    @ValueSource(strings = {"", "12345678901"})
    void 멤버의_닉네임이_1자_미만_10자_초과이면_예외를_던진다(String nickname) {
        assertThatThrownBy(() -> new Member(nickname))
                .isInstanceOf(MemberNameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(strings = {"1", "1234567890"})
    void 멤버의_닉네임이_1자_이상_10자_이하이면_정상_케이스이다(String nickname) {
        assertThatCode(() -> new Member(nickname))
                .doesNotThrowAnyException();
    }
}
