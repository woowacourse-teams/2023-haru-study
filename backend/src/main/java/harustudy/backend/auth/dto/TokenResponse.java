package harustudy.backend.auth.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import harustudy.backend.auth.domain.RefreshToken;
import java.util.UUID;

@JsonInclude(Include.NON_NULL)
public record TokenResponse(String accessToken, @JsonIgnore UUID refreshToken, @JsonIgnore Long expireLength) {

    public static TokenResponse forLoggedIn(String accessToken, RefreshToken refreshToken, Long expireLength) {
        return new TokenResponse(accessToken, refreshToken.getUuid(), expireLength);
    }

    public static TokenResponse forGuest(String accessToken) {
        return new TokenResponse(accessToken, null, null);
    }
}
