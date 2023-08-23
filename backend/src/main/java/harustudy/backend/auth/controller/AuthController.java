package harustudy.backend.auth.controller;

import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.exception.RefreshTokenCookieNotExistsException;
import harustudy.backend.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "인증 관련 기능")
@RequiredArgsConstructor
@RequestMapping("api/auth")
@RestController
public class AuthController {

    @Value("${refresh-token.expire-length}")
    private Long refreshTokenExpireLength;

    private final AuthService authService;

    @Operation(summary = "비회원 로그인 요청")
    @PostMapping("/guest")
    public ResponseEntity<TokenResponse> guestLogin() {
        TokenResponse tokenResponse = authService.guestLogin();
        return ResponseEntity.ok(tokenResponse);
    }

    @Operation(summary = "소셜 로그인 요청")
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> oauthLogin(
            HttpServletResponse httpServletResponse,
            @RequestBody OauthLoginRequest request
    ) {
        TokenResponse tokenResponse = authService.oauthLogin(request);
        Cookie cookie = setUpRefreshTokenCookie(tokenResponse);
        httpServletResponse.addCookie(cookie);
        return ResponseEntity.ok(tokenResponse);
    }

    @Operation(summary = "access 토큰, refresh 토큰 갱신")
    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(
            HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse
    ) {
        String refreshToken = extractRefreshTokenFromCookie(httpServletRequest);
        TokenResponse tokenResponse = authService.refresh(refreshToken);
        Cookie cookie = setUpRefreshTokenCookie(tokenResponse);
        httpServletResponse.addCookie(cookie);
        return ResponseEntity.ok(tokenResponse);
    }

    private Cookie setUpRefreshTokenCookie(TokenResponse tokenResponse) {
        Cookie cookie = new Cookie("refreshToken", tokenResponse.refreshToken().toString());
        cookie.setMaxAge(refreshTokenExpireLength.intValue() / 1000);
        cookie.setPath("/");
        return cookie;
    }

    private String extractRefreshTokenFromCookie(HttpServletRequest httpServletRequest) {
        return Arrays.stream(httpServletRequest.getCookies())
                .filter(cookie -> cookie.getName().equals("refreshToken"))
                .map(Cookie::getValue)
                .findAny()
                .orElseThrow(RefreshTokenCookieNotExistsException::new);
    }
}
