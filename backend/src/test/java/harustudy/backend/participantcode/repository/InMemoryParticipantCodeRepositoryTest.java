package harustudy.backend.participantcode.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.Map;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class InMemoryParticipantCodeRepositoryTest {

    @SuppressWarnings("unchecked")
    @Test
    void 만료된_참여_코드만_삭제한다() throws Exception {
        // given
        InMemoryParticipantCodeRepository repository = new InMemoryParticipantCodeRepository();
        GenerationStrategy outDatedCodeGenerationStrategy = new OutDatedCodeGenerationStrategy();
        int outDatedCount = 49;
        for (int i = 0; i < outDatedCount; i++) {
            repository.save(new ParticipantCode(outDatedCodeGenerationStrategy));
        }

        GenerationStrategy validCodeGenerationStrategy = new ValidCodeGenerationStrategy();
        int validCount = 51;
        for (int i = 0; i < validCount; i++) {
            repository.save(new ParticipantCode(validCodeGenerationStrategy));
        }

        // when
        repository.expireCode();

        // then
        Field field = repository.getClass()
                .getDeclaredField("participantCodeRepository");
        field.setAccessible(true);
        Map<String, ParticipantCode> map = (Map<String, ParticipantCode>) field.get(repository);
        assertThat(map).hasSize(51);
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
