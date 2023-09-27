package harustudy.backend.study.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.study.exception.PomodoroStudyNameLengthException;
import harustudy.backend.study.exception.PomodoroTimePerCycleException;
import harustudy.backend.study.exception.PomodoroTotalCycleException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroStudyTest {

    @Test
    void 스터디방은_스터디명_사이클_수_사이클_당_스터디_시간이_필요하다() {
        // given, when, then
        assertThatCode(() -> new PomodoroStudy("teo", 3, 20))
                .doesNotThrowAnyException();
    }

    @Test
    void 스터디방_이름이_1자_이상_10자_이하이면_정상_케이스이다() {
        // given
        String name = "12345";

        // when, then
        assertThatCode(() -> new PomodoroStudy(name, 3, 20))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "01234567890"})
    void 스터디방_이름이_1자_미만이거나_10자_초과라면_예외를_던진다(String name) {
        // given, when, then
        assertThatThrownBy(() -> new PomodoroStudy(name, 3, 20))
                .isInstanceOf(PomodoroStudyNameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 8})
    void 사이클은_최소_1번_최대_8번이_정상_케이스이다(int cycle) {
        // given, when, then
        assertThatCode(() -> new PomodoroStudy("teo", cycle, 20))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 9})
    void 사이클은_1번_미만이거나_8번_초과라면_예외를_던진다(int cycle) {
        // given, when, then
        assertThatThrownBy(() -> new PomodoroStudy("teo", cycle, 20))
                .isInstanceOf(PomodoroTotalCycleException.class);
    }

    @ParameterizedTest
    @ValueSource(ints = {20, 60})
    void 스터디_시간은_최소_20분_최대_60분이_정상_케이스이다(int timePerCycle) {
        // given, when, then
        assertThatCode(() -> new PomodoroStudy("teo", 5, timePerCycle))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(ints = {19, 61})
    void 스터디_시간은_20분_미만이거나_60분_초과라면_예외를_던진다(int timePerCycle) {
        // given, when, then
        assertThatThrownBy(() -> new PomodoroStudy("teo", 5, timePerCycle))
                .isInstanceOf(PomodoroTimePerCycleException.class);
    }
}