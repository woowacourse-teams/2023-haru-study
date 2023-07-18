package harustudy.backend.config;

import harustudy.backend.entity.CodeGenerationStrategy;
import harustudy.backend.entity.GenerationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {

    @Bean
    public GenerationStrategy generationStrategy() {
        return new CodeGenerationStrategy();
    }
}
