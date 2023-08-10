package harustudy.backend.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import harustudy.backend.auth.domain.RefreshToken;
import java.util.UUID;

@JsonInclude(Include.NON_NULL)
public record TokenResponse(String accessToken, UUID refreshToken) {

    public static TokenResponse forLoggedIn(String accessToken, RefreshToken refreshToken) {
        return new TokenResponse(accessToken, refreshToken.getUuid());
    }

    public static TokenResponse forGuest(String accessToken) {
        return new TokenResponse(accessToken, null);
    }
}
