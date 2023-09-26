package harustudy.backend.participant.domain;

import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.exception.NicknameLengthException;
import harustudy.backend.study.domain.Study;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.*;

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
        assertThatThrownBy(() -> Participant.instantiateParticipantWithContents(study, member, nickname))
                .isInstanceOf(NicknameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(strings = {"1", "1234567890"})
    void 멤버의_닉네임이_1자_이상_10자_이하이면_정상_케이스이다(String nickname) {
        // given, when, then
        assertThatCode(() -> Participant.instantiateParticipantWithContents(study, member, nickname))
                .doesNotThrowAnyException();
    }

    @Test
    void 닉네임이_동일한지_확인할_수_있다() {
        // given
        Participant participant = Participant.instantiateParticipantWithContents(study, member, "nickname");
        Participant otherParticipant = Participant.instantiateParticipantWithContents(study, member, "nickname");

        // when, then
        assertThat(participant.hasSameNicknameWith(otherParticipant)).isTrue();
    }

    @Test
    void 닉네임이_다른지_확인할_수_있다() {
        // given
        Participant participant = Participant.instantiateParticipantWithContents(study, member, "nickname");
        Participant otherParticipant = Participant.instantiateParticipantWithContents(study, member, "another");

        // when, then
        assertThat(participant.hasSameNicknameWith(otherParticipant)).isFalse();
    }

    @Test
    void 스터디에_참여하면_스터디의_참여_인원이_증가한다() {
        // given, when
        Participant participant = Participant.instantiateParticipantWithContents(study, member, "nickname");

        // then
        assertThat(participant.getStudy().getParticipants()).hasSize(1);
    }

    @Test
    void 스터디에_첫_번째로_참여하면_방장이다() {
        // given, when
        Participant host = Participant.instantiateParticipantWithContents(study, member, "host");

        // then
        assertThat(host.getIsHost()).isTrue();
    }

    @Test
    void 스터디에_첫_번째_이후로_참여하면_방장이_아니다() {
        // given, when
        Participant.instantiateParticipantWithContents(study, member, "host");
        Participant participant = Participant.instantiateParticipantWithContents(study, member, "parti");

        // then
        assertThat(participant.getIsHost()).isFalse();
    }
}
