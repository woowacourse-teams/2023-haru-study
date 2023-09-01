package harustudy.backend.participantcode.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class InMemoryParticipantCodeRepositoryTest {

    @Test
    void 만료된_참여_코드만_삭제한다() {
        // given
        InMemoryParticipantCodeRepository repository = new InMemoryParticipantCodeRepository();
        GenerationStrategy outDatedCodeGenerationStrategy = new OutDatedCodeGenerationStrategy();
        GenerationStrategy validCodeGenerationStrategy = new ValidCodeGenerationStrategy();
        ParticipantCode outdatedCode = new ParticipantCode(null, outDatedCodeGenerationStrategy);
        ParticipantCode validCode = new ParticipantCode(null, validCodeGenerationStrategy);
        repository.save(outdatedCode);
        repository.save(validCode);

        // when
        repository.expireCode();

        // then
        assertThat(repository.findByCode(outdatedCode.getCode()).isEmpty()).isTrue();
        assertThat(repository.findByCode(validCode.getCode()).isEmpty()).isFalse();
    }

    private static class OutDatedCodeGenerationStrategy implements GenerationStrategy {

        private int count = 10_000;

        @Override
        public String generate() {
            return Integer.toString(count++);
        }

        @Override
        public LocalDateTime getCreatedDate() {
            return LocalDateTime.now()
                    .minusSeconds(GenerationStrategy.EXPIRATION_PERIOD_IN_SECONDS + 1);
        }
    }

    private static class ValidCodeGenerationStrategy implements GenerationStrategy {

        private int count = 20_000;

        @Override
        public String generate() {
            return Integer.toString(count++);
        }

        @Override
        public LocalDateTime getCreatedDate() {
            return LocalDateTime.now().plusYears(9999);
        }
    }
}
