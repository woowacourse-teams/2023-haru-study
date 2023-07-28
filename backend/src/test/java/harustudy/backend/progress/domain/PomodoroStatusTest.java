package harustudy.backend.progress.domain;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.room.domain.progress.PomodoroStatus;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroStatusTest {

    @Nested
    class 다음_스터디_상태를_반환한다 {

        @Test
        void 회고_단계에서_계획_단계로() {
            // given
            PomodoroStatus currentStatus = PomodoroStatus.RETROSPECT;
            // when
            PomodoroStatus nextStatus = currentStatus.getNext();
            // then
            assertThat(nextStatus).isEqualTo(PomodoroStatus.PLANNING);
        }

        @Test
        void 계획_단계에서_진행_단계로() {
            // given
            PomodoroStatus currentStatus = PomodoroStatus.PLANNING;
            // when
            PomodoroStatus nextStatus = currentStatus.getNext();
            // then
            assertThat(nextStatus).isEqualTo(PomodoroStatus.STUDYING);
        }

        @Test
        void 진행_단계에서_회고_단계로() {
            // given
            PomodoroStatus currentStatus = PomodoroStatus.STUDYING;
            // when
            PomodoroStatus nextStatus = currentStatus.getNext();
            // then
            assertThat(nextStatus).isEqualTo(PomodoroStatus.RETROSPECT);
        }
    }
}
