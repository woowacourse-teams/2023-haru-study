package harustudy.backend.auth.controller;

import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.exception.RefreshTokenNotExistsException;
import harustudy.backend.auth.service.AuthService;
import harustudy.backend.auth.service.OauthLoginFacade;
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
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "인증 관련 기능")
@RequiredArgsConstructor
@RestController
public class AuthController {

    @Value("${refresh-token.expire-length}")
    private Long refreshTokenExpireLength;

    private final OauthLoginFacade oauthLoginFacade;
    private final AuthService authService;

    @Operation(summary = "비회원 로그인 요청")
    @PostMapping("/api/auth/guest")
    public ResponseEntity<TokenResponse> guestLogin() {
        TokenResponse tokenResponse = authService.guestLogin();
        return ResponseEntity.ok(tokenResponse);
    }

    @Operation(summary = "소셜 로그인 요청")
    @PostMapping("/api/auth/login")
    public ResponseEntity<TokenResponse> oauthLogin(
            HttpServletResponse httpServletResponse,
            @RequestBody OauthLoginRequest request
    ) {
        TokenResponse tokenResponse = oauthLoginFacade.oauthLogin(request);
        Cookie cookie = setUpRefreshTokenCookie(tokenResponse);
        httpServletResponse.addCookie(cookie);
        return ResponseEntity.ok(tokenResponse);
    }

    @Operation(summary = "access 토큰, refresh 토큰 갱신")
    @PostMapping("/api/auth/refresh")
    public ResponseEntity<TokenResponse> refresh(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        String refreshToken = extractRefreshTokenFromCookie(request);
        TokenResponse tokenResponse = authService.refresh(refreshToken);
        Cookie cookie = setUpRefreshTokenCookie(tokenResponse);
        response.addCookie(cookie);
        return ResponseEntity.ok(tokenResponse);
    }

    private Cookie setUpRefreshTokenCookie(TokenResponse tokenResponse) {
        Cookie cookie = new Cookie("refreshToken", tokenResponse.refreshToken().toString());
        cookie.setMaxAge(refreshTokenExpireLength.intValue() / 1000);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    private String extractRefreshTokenFromCookie(HttpServletRequest request) {
        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("refreshToken"))
                .map(Cookie::getValue)
                .findAny()
                .orElseThrow(RefreshTokenNotExistsException::new);
    }

    @Operation(summary = "로그아웃, access & refresh 토큰 삭제")
    @PostMapping("/api/auth/logout")
    public ResponseEntity<Void> logout(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        String refreshToken = extractRefreshTokenFromCookie(request);
        authService.deleteStringifiedRefreshToken(refreshToken);

        deleteCookies(request, response);

        return ResponseEntity.ok().build();
    }

    private void deleteCookies(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                cookie.setMaxAge(0);
                response.addCookie(cookie);
            }
        }
    }
}
