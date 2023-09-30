package harustudy.backend.auth.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@RequiredArgsConstructor
@Configuration
public class OauthClientConfiguration {

    private final List<OauthClient> oauthClients;

    @Bean
    public OauthClient oauthClient() {
        return new CompositeOauthClient(oauthClients);
    }
}
