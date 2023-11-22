package harustudy.backend.config;

import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import io.jsonwebtoken.Clock;
import io.jsonwebtoken.impl.DefaultClock;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public GenerationStrategy generationStrategy() {
        return new CodeGenerationStrategy();
    }

    @Bean
    public Clock clock() {
        return new DefaultClock();
    }
}
