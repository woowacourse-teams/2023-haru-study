package harustudy.backend.entity;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.exception.StudyNameLengthException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroTest {

    @Test
    void 스터디는_스터디명_사이클_수_사이클_당_스터디_시간이_필요하다() {
        // given, when, then
        assertThatCode(() -> new Pomodoro("teo", 3, 20))
                .doesNotThrowAnyException();
    }

   @Test
    void 스터디명이_1자_미만이면_예외를_던진다() {
        // given
        String name = "";
        // when, then
        assertThatThrownBy(() -> new Pomodoro(name, 3, 20))
                .isInstanceOf(StudyNameLengthException.class);
    }

    @Test
    void 스터디명이_1자_이상_10자_이하이면_정상_케이스이다() {
        // given
        String name = "12345";
        // when, then
        assertThatCode(() -> new Pomodoro(name, 3, 20))
                .doesNotThrowAnyException();
    }

    @Test
    void 스터디명이_10자_초과라면_예외를_던진다() {
        // given
        String name = "12345678910";
        // when, then
        assertThatThrownBy(() -> new Pomodoro(name, 3, 20))
                .isInstanceOf(StudyNameLengthException.class);
    }
}
