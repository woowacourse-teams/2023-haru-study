package harustudy.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(servers = {
        @Server(url = "https://haru-study.com", description = "하루스터디"),
})
@Configuration
public class OpenApiConfiguration {

    @Bean
    public OpenAPI openAPI() {
        final Info info = new Info()
                .version("v1.0.0")
                .title("하루스터디 API")
                .description("하루스터디 API 명세");

        return new OpenAPI()
                .components(new Components())
                .info(info);
    }
}
