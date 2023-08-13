package harustudy.backend.auth.controller;

import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.RefreshTokenRequest;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.exception.InvalidProviderNameException;
import harustudy.backend.auth.exception.InvalidRefreshTokenException;
import harustudy.backend.auth.exception.RefreshTokenExpiredException;
import harustudy.backend.auth.service.AuthService;
import harustudy.backend.common.SwaggerExceptionResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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

    private final AuthService authService;

    @Operation(summary = "소셜 로그인 요청")
    @SwaggerExceptionResponse(InvalidProviderNameException.class)
    @PostMapping("/login")
    public ResponseEntity<TokenResponse> oauthLogin(@RequestBody OauthLoginRequest request) {
        TokenResponse tokenResponse = authService.oauthLogin(request);
        return ResponseEntity.ok(tokenResponse);
    }

    @Operation(summary = "비회원 로그인 요청")
    @PostMapping("/guest")
    public ResponseEntity<TokenResponse> guestLogin() {
        TokenResponse tokenResponse = authService.guestLogin();
        return ResponseEntity.ok(tokenResponse);
    }

    @Operation(summary = "access 토큰, refresh 토큰 갱신")
    @SwaggerExceptionResponse({
            InvalidRefreshTokenException.class,
            RefreshTokenExpiredException.class})
    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestBody RefreshTokenRequest request) {
        TokenResponse tokenResponse = authService.refresh(request);
        return ResponseEntity.ok(tokenResponse);
    }
}
