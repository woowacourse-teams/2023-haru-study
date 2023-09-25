package harustudy.backend.study.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.study.exception.StudyNameLengthException;
import harustudy.backend.study.exception.TimePerCycleException;
import harustudy.backend.study.exception.TotalCycleException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import java.util.stream.IntStream;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class StudyTest {

    @Test
    void 스터디방은_스터디명_사이클_수_사이클_당_스터디_시간이_필요하다() {
        // given, when, then
        assertThatCode(() -> new Study("teo", 3, 20))
                .doesNotThrowAnyException();
    }

    @Test
    void 스터디방_이름이_1자_이상_10자_이하이면_정상_케이스이다() {
        // given
        String name = "12345";

        // when, then
        assertThatCode(() -> new Study(name, 3, 20))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "01234567890"})
    void 스터디방_이름이_1자_미만이거나_10자_초과라면_예외를_던진다(String name) {
        // given, when, then
        assertThatThrownBy(() -> new Study(name, 3, 20))
                .isInstanceOf(StudyNameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 8})
    void 사이클은_최소_1번_최대_8번이_정상_케이스이다(int cycle) {
        // given, when, then
        assertThatCode(() -> new Study("teo", cycle, 20))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 9})
    void 사이클은_1번_미만이거나_8번_초과라면_예외를_던진다(int cycle) {
        // given, when, then
        assertThatThrownBy(() -> new Study("teo", cycle, 20))
                .isInstanceOf(TotalCycleException.class);
    }

    @ParameterizedTest
    @ValueSource(ints = {20, 60})
    void 스터디_시간은_최소_20분_최대_60분이_정상_케이스이다(int timePerCycle) {
        // given, when, then
        assertThatCode(() -> new Study("teo", 5, timePerCycle))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(ints = {19, 61})
    void 스터디_시간은_20분_미만이거나_60분_초과라면_예외를_던진다(int timePerCycle) {
        // given, when, then
        assertThatThrownBy(() -> new Study("teo", 5, timePerCycle))
                .isInstanceOf(TimePerCycleException.class);
    }

    @Test
    void 다음_스터디_단계로_넘어갈_수_있다() {
        // given
        Study study = new Study("study", 1, 20);

        // given
        study.proceed();

        // then
        assertSoftly(softly -> {
            softly.assertThat(study.getCurrentCycle()).isEqualTo(1);
            softly.assertThat(study.getStep())
                    .isEqualTo(Step.PLANNING);
        });
    }

    @Test
    void 마지막_사이클이_아니라면_회고_종료_후_사이클_수가_증가한다() {
        // given
        Study study = new Study("study", 2, 20);

        // when
        int stepCountPerCycle = 3;

        study.proceed();

        IntStream.range(0, stepCountPerCycle)
                .forEach(i -> study.proceed());

        // then
        assertSoftly(softly -> {
            softly.assertThat(study.getCurrentCycle()).isEqualTo(2);
            softly.assertThat(study.getStep())
                    .isEqualTo(Step.PLANNING);
        });
    }


    @Test
    void 마지막_사이클이라면_회고_이후_사이클은_그대로이며_종료_상태로_넘어간다() {
        // given
        int totalCycle = 3;
        int stepCountPerCycle = 3;
        Study study = new Study("study", totalCycle, 20);


        study.proceed();

        IntStream.range(0, stepCountPerCycle * totalCycle)
                .forEach(i -> study.proceed());

        // when
        study.proceed();

        // then
        assertSoftly(softly -> {
            softly.assertThat(study.getCurrentCycle()).isEqualTo(totalCycle);
            softly.assertThat(study.getStep()).isEqualTo(Step.DONE);
        });
    }
}
