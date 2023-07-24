package harustudy.backend.progress.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class StudyStatusTest {

    @Nested
    class 다음_스터디_상태를_반환한다 {

        @Test
        void 회고_단계에서_계획_단계로() {
            // given
            StudyStatus currentStatus = StudyStatus.RETROSPECT;
            // when
            StudyStatus nextStatus = currentStatus.getNext();
            // then
            assertThat(nextStatus).isEqualTo(StudyStatus.PLANNING);
        }

        @Test
        void 계획_단계에서_진행_단계로() {
            // given
            StudyStatus currentStatus = StudyStatus.PLANNING;
            // when
            StudyStatus nextStatus = currentStatus.getNext();
            // then
            assertThat(nextStatus).isEqualTo(StudyStatus.STUDYING);
        }

        @Test
        void 진행_단계에서_회고_단계로() {
            // given
            StudyStatus currentStatus = StudyStatus.STUDYING;
            // when
            StudyStatus nextStatus = currentStatus.getNext();
            // then
            assertThat(nextStatus).isEqualTo(StudyStatus.RETROSPECT);
        }
    }
}
