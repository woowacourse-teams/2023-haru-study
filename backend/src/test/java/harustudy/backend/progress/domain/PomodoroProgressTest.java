package harustudy.backend.progress.domain;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroProgressTest {

    @Test
    void 회고_단계_종료_후_사이클_수가_증가한다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        PomodoroRoom room = new PomodoroRoom("room", 3, 25, participantCode);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(room, member);

        // when
        for (int i = 0; i < PomodoroStatus.values().length; i++) {
            pomodoroProgress.proceed();
        }

        // then
        assertThat(pomodoroProgress.getCurrentCycle()).isEqualTo(2);
    }
}
