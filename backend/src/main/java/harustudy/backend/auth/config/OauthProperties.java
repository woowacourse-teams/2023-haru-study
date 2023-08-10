package harustudy.backend.auth.config;

import java.util.Map;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Setter
@Configuration
@ConfigurationProperties(prefix = "oauth2")
public class OauthProperties {

    private Map<String, OauthProperty> oauthProperties;

    public OauthProperty get(String providerName) {
        return oauthProperties.get(providerName);
    }
}
