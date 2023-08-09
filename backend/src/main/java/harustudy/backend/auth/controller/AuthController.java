package harustudy.backend.auth.controller;

import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.RefreshTokenRequest;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "소셜 로그인 요청")
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

    @Operation(summary = "refresh 토큰, access 토큰 갱신")
    @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refresh(@RequestBody RefreshTokenRequest request) {
        TokenResponse tokenResponse = authService.refresh(request);
        return ResponseEntity.ok(tokenResponse);
    }

    @Operation(summary = "refresh 토큰 검증")
    @PostMapping("/validate")
    public ResponseEntity<Void> validate(@RequestBody RefreshTokenRequest request) {
        authService.validateRefreshToken(request);
        return ResponseEntity.ok().build();
    }
}
