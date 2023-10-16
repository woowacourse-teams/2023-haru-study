package harustudy.backend.polling.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.content.domain.Content;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.polling.exception.CannotSeeSubmittersException;
import java.util.Map;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class SubmitterCheckingStrategyTest {

    @Test
    void 계획을_제출했는지_판단할_수_있다() {
        // given
        Step step = Step.PLANNING;
        Content content = new Content(null, 1);

        // when
        content.changePlan(Map.of("key", "value"));

        // then
        assertThat(SubmitterCheckingStrategy.isSubmitted(step, content)).isTrue();
    }

    @Test
    void 계획을_제출하지_않았는지_판단할_수_있다() {
        // given
        Step step = Step.PLANNING;
        Content content = new Content(null, 1);

        // when, then
        assertThat(SubmitterCheckingStrategy.isSubmitted(step, content)).isFalse();
    }

    @Test
    void 학습_단계에서는_항상_제출했다고_판단한다() {
        // given
        Step step = Step.STUDYING;
        Content content = new Content(null, 1);

        // when, then
        assertThat(SubmitterCheckingStrategy.isSubmitted(step, content)).isTrue();
    }

    @Test
    void 회고를_제출했는지_판단할_수_있다() {
        // given
        Step step = Step.RETROSPECT;
        Content content = new Content(null, 1);

        // when
        content.changeRetrospect(Map.of("key", "value"));

        // then
        assertThat(SubmitterCheckingStrategy.isSubmitted(step, content)).isTrue();
    }

    @Test
    void 회고를_제출하지_않았는지_판단할_수_있다() {
        // given
        Step step = Step.RETROSPECT;
        Content content = new Content(null, 1);

        // when, then
        assertThat(SubmitterCheckingStrategy.isSubmitted(step, content)).isFalse();
    }

    @ParameterizedTest
    @EnumSource(names = {"WAITING", "DONE"})
    void 대기_상태나_완료_상태에서는_판단이_불가능하다(Step step) {
        // given
        Content content = new Content(null, 1);

        // when, then
        assertThatThrownBy(() -> SubmitterCheckingStrategy.isSubmitted(step, content))
                .isInstanceOf(CannotSeeSubmittersException.class);
    }
}
