package harustudy.backend.auth;

import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "oauth2")
@Getter
public class OauthProperties {

  private final Map<String, OauthProperty> oauthProperties = new HashMap<>();

  public OauthProperty get(String providerName) {
    return oauthProperties.get(providerName);
  }
}
