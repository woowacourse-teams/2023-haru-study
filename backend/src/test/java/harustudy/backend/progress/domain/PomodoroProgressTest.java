package harustudy.backend.progress.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

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
    void 마지막_사이클이_아니라면_회고_종료_후_사이클_수가_증가한다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        PomodoroRoom room = new PomodoroRoom("room", 3, 25, participantCode);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(room, member);

        // when
        int notDoneStatusCount = 3;
        for (int i = 0; i < notDoneStatusCount; i++) {
            pomodoroProgress.proceedV2();
        }

        // then
        assertThat(pomodoroProgress.getCurrentCycle()).isEqualTo(2);
    }

    @Test
    void 마지막_사이클이라면_회고_이후_사이클은_그대로이며_종료_상태로_넘어간다() {
        // given
        int totalCycle = 3;
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        PomodoroRoom room = new PomodoroRoom("room", 3, 25, participantCode);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(room, member);

        // when
        // 마지막 사이클의 회고 상태까지 진행시킨다
        int notDoneStatusCount = 3;
        for (int i = 0; i < totalCycle * notDoneStatusCount; i++) {
            pomodoroProgress.proceedV2();
        }
        // 완료 상태로 넘어간다
        pomodoroProgress.proceedV2();

        // then
        assertSoftly(softly -> {
            softly.assertThat(pomodoroProgress.getCurrentCycle()).isEqualTo(totalCycle);
            softly.assertThat(pomodoroProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.DONE);
        });
    }
}
