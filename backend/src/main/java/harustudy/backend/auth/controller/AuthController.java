package harustudy.backend.auth.controller;

import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.service.AuthService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/auth")
@RequiredArgsConstructor
@RestController
public class AuthController {

  private final AuthService authService;

  @GetMapping("/{oauthProvider}/login")
  public ResponseEntity<TokenResponse> oauthLogin(@PathVariable String oauthProvider,
      @RequestParam String code) {
    TokenResponse tokenResponse = authService.oauthLogin(oauthProvider, code);
    return ResponseEntity.ok(tokenResponse);
  }

  @GetMapping("/guest")
  public ResponseEntity<TokenResponse> guestLogin() {
    TokenResponse tokenResponse = authService.guestLogin();
    return ResponseEntity.ok(tokenResponse);
  }

  @GetMapping("/refresh")
  public ResponseEntity<TokenResponse> refresh(@RequestParam UUID refreshToken) {
    TokenResponse tokenResponse = authService.refresh(refreshToken);
    return ResponseEntity.ok(tokenResponse);
  }
}
