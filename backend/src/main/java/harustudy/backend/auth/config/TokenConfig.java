package harustudy.backend.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public record TokenConfig(
        @Value("${jwt.secret-key}") String secretKey,
        @Value("${jwt.expire-length}") long accessTokenExpireLength,
        @Value("${jwt.guest-expire-length}") long guestAccessTokenExpireLength,
        @Value("${refresh-token.expire-length}") long refreshTokenExpireLength) {

}
