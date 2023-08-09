package harustudy.backend.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

@Builder
public record OauthTokenResponse(
    @JsonProperty("access_token") String accessToken,
    String scope,
    @JsonProperty("token_type") String tokenType) {

}
