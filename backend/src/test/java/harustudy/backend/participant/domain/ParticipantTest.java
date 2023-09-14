package harustudy.backend.participant.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.exception.NicknameLengthException;
import harustudy.backend.study.domain.Study;
import java.util.stream.IntStream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class ParticipantTest {

    private Study study;
    private Member member;

    @BeforeEach
    void setUp() {
        study = new Study("study", 3, 25);
        member = Member.guest();
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "12345678901"})
    void 멤버의_닉네임이_1자_미만_10자_초과이면_예외를_던진다(String nickname) {
        // given, when, then
        assertThatThrownBy(() -> new Participant(study, member, nickname))
                .isInstanceOf(NicknameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(strings = {"1", "1234567890"})
    void 멤버의_닉네임이_1자_이상_10자_이하이면_정상_케이스이다(String nickname) {
        // given, when, then
        assertThatCode(() -> new Participant(study, member, nickname))
                .doesNotThrowAnyException();
    }

    @Test
    void 닉네임이_동일한지_확인할_수_있다() {
        // given
        Participant participant = new Participant(study, member, "nickname");
        Participant otherParticipant = new Participant(study, member, "nickname");

        // when, then
        assertThat(participant.hasSameNicknameWith(otherParticipant)).isTrue();
    }

    @Test
    void 닉네임이_다른지_확인할_수_있다() {
        // given
        Participant participant = new Participant(study, member, "nickname");
        Participant otherParticipant = new Participant(study, member, "another");

        // when, then
        assertThat(participant.hasSameNicknameWith(otherParticipant)).isFalse();
    }

    @Test
    void 다음_스터디_단계로_넘어갈_수_있다() {
        // given
        Participant participant = new Participant(study, member, "nickname");

        // given
        participant.proceed();

        // then
        assertSoftly(softly -> {
            softly.assertThat(participant.getCurrentCycle()).isEqualTo(1);
            softly.assertThat(participant.getStep())
                    .isEqualTo(Step.STUDYING);
        });
    }

    @Test
    void 마지막_사이클이_아니라면_회고_종료_후_사이클_수가_증가한다() {
        // given
        Participant participant = new Participant(study, member, "nickname");

        // when
        int stepCountPerCycle = 3;

        IntStream.range(0, stepCountPerCycle)
                .forEach(i -> participant.proceed());

        // then
        assertSoftly(softly -> {
            softly.assertThat(participant.getCurrentCycle()).isEqualTo(2);
            softly.assertThat(participant.getStep())
                    .isEqualTo(Step.PLANNING);
        });
    }


    @Test
    void 마지막_사이클이라면_회고_이후_사이클은_그대로이며_종료_상태로_넘어간다() {
        // given
        Participant participant = new Participant(study, member, "nickname");

        int stepCountPerCycle = 3;
        int totalCycle = 3;

        IntStream.range(0, stepCountPerCycle * totalCycle)
                .forEach(i -> participant.proceed());

        // when
        participant.proceed();

        // then
        assertSoftly(softly -> {
            softly.assertThat(participant.getCurrentCycle()).isEqualTo(totalCycle);
            softly.assertThat(participant.getStep()).isEqualTo(Step.DONE);
        });
    }
}
