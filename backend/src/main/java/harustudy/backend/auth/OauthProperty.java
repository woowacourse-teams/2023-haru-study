package harustudy.backend.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OauthProperty {

  private String clientId;
  private String clientSecret;
  private String redirectUri;
  private String tokenUri;
  private String userInfoUri;
}
