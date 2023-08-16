package harustudy.backend.integration;

import harustudy.backend.auth.dto.TokenResponse;
import jakarta.servlet.http.Cookie;

public record LoginResponse(TokenResponse tokenResponse, Cookie cookie) {
    public String createAuthorizationHeader() {
        return "Bearer " + tokenResponse.accessToken();
    }
}
