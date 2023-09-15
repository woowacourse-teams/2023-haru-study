package harustudy.backend.participant.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class StepTest {

    @Nested
    class 다음_스터디_상태를_반환한다 {

        @Test
        void 회고_단계에서_계획_단계로() {
            // given
            Step currentStep = Step.RETROSPECT;
            // when
            Step nextStep = currentStep.getNext();
            // then
            assertThat(nextStep).isEqualTo(Step.PLANNING);
        }

        @Test
        void 계획_단계에서_진행_단계로() {
            // given
            Step currentStep = Step.PLANNING;
            // when
            Step nextStep = currentStep.getNext();
            // then
            assertThat(nextStep).isEqualTo(Step.STUDYING);
        }

        @Test
        void 진행_단계에서_회고_단계로() {
            // given
            Step currentStep = Step.STUDYING;
            // when
            Step nextStep = currentStep.getNext();
            // then
            assertThat(nextStep).isEqualTo(Step.RETROSPECT);
        }
    }
}
