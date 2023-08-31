package harustudy.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.room.domain.CodeGenerationStrategy;
import harustudy.backend.room.domain.GenerationStrategy;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class CodeGenerationStrategyTest {

    @Test
    void 참여코드는_6글자이다() {
        // given
        GenerationStrategy codeGenerationStrategy = new CodeGenerationStrategy();
        // when
        String code = codeGenerationStrategy.generate();
        // then
        assertThat(code.length()).isEqualTo(6);
    }

    @Test
    void 참여코드는_모두_알파벳_대문자이다() {
        // given
        GenerationStrategy codeGenerationStrategy = new CodeGenerationStrategy();
        // when
        String code = codeGenerationStrategy.generate();
        // then
        assertThat(code).isAlphabetic();
        assertThat(code).isUpperCase();
    }
}
