package harustudy.backend.progress.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import harustudy.backend.member.domain.Member;
import harustudy.backend.progress.exception.NicknameLengthException;
import harustudy.backend.room.domain.PomodoroRoom;
import java.util.stream.IntStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroProgressTest {

    private PomodoroRoom pomodoroRoom;
    private Member member;

    @BeforeEach
    void setUp() {
        pomodoroRoom = new PomodoroRoom("room", 3, 25);
        member = Member.guest();
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "12345678901"})
    void 멤버의_닉네임이_1자_미만_10자_초과이면_예외를_던진다(String nickname) {
        // given, when, then
        assertThatThrownBy(() -> new PomodoroProgress(pomodoroRoom, member, nickname))
                .isInstanceOf(NicknameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(strings = {"1", "1234567890"})
    void 멤버의_닉네임이_1자_이상_10자_이하이면_정상_케이스이다(String nickname) {
        // given, when, then
        assertThatCode(() -> new PomodoroProgress(pomodoroRoom, member, nickname))
                .doesNotThrowAnyException();
    }

    @Test
    void 닉네임이_동일한지_확인할_수_있다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, "nickname");
        PomodoroProgress otherProgress = new PomodoroProgress(pomodoroRoom, member, "nickname");

        // when, then
        assertThat(pomodoroProgress.hasSameNicknameWith(otherProgress)).isTrue();
    }

    @Test
    void 닉네임이_다른지_확인할_수_있다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, "nickname");
        PomodoroProgress otherProgress = new PomodoroProgress(pomodoroRoom, member, "another");

        // when, then
        assertThat(pomodoroProgress.hasSameNicknameWith(otherProgress)).isFalse();
    }

    @Test
    void 다음_스터디_단계로_넘어갈_수_있다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, "nickname");

        // given
        pomodoroProgress.proceed();

        // then
        assertSoftly(softly -> {
            softly.assertThat(pomodoroProgress.getCurrentCycle()).isEqualTo(1);
            softly.assertThat(pomodoroProgress.getPomodoroStatus())
                    .isEqualTo(PomodoroStatus.STUDYING);
        });
    }

    @Test
    void 마지막_사이클이_아니라면_회고_종료_후_사이클_수가_증가한다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, "nickname");

        // when
        int statusCountPerCycle = 3;

        IntStream.range(0, statusCountPerCycle)
                .forEach(i -> pomodoroProgress.proceed());

        // then
        assertSoftly(softly -> {
            softly.assertThat(pomodoroProgress.getCurrentCycle()).isEqualTo(2);
            softly.assertThat(pomodoroProgress.getPomodoroStatus())
                    .isEqualTo(PomodoroStatus.PLANNING);
        });
    }


    @Test
    void 마지막_사이클이라면_회고_이후_사이클은_그대로이며_종료_상태로_넘어간다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, "nickname");

        int statusCountPerCycle = 3;
        int totalCycle = 3;

        IntStream.range(0, statusCountPerCycle * totalCycle)
                .forEach(i -> pomodoroProgress.proceed());

        // when
        pomodoroProgress.proceed();

        // then
        assertSoftly(softly -> {
            softly.assertThat(pomodoroProgress.getCurrentCycle()).isEqualTo(totalCycle);
            softly.assertThat(pomodoroProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.DONE);
        });
    }
}
