package harustudy.backend.participantcode.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

import harustudy.backend.study.domain.Study;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class ParticipantCodeTest {

    @Test
    void 참여코드를_생성할_수_있다() {
        // given & when
        GenerationStrategy generationStrategy = new CodeGenerationStrategy();
        // then
        assertThatCode(
                () -> new ParticipantCode(new Study("name", 1, 20), generationStrategy))
                .doesNotThrowAnyException();
    }

    @Test
    void 기존_값과_다른_참여코드를_생성할_수_있다() {
        // given & when
        GenerationStrategy generationStrategy = new CodeGenerationStrategy();
        ParticipantCode participantCode = new ParticipantCode(new Study("name", 1, 20),
                generationStrategy);

        String oldCode = participantCode.getCode();
        participantCode.regenerate();
        // then
        assertThat(oldCode).isNotEqualTo(participantCode.getCode());
    }
}
