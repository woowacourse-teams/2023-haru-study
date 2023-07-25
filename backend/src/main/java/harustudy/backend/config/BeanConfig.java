package harustudy.backend.config;

import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public GenerationStrategy generationStrategy() {
        return new CodeGenerationStrategy();
    }
}
