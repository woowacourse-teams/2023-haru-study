package harustudy.backend.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public record TokenConfig(
        @Value("${access-token.secret-key}") String secretKey,
        @Value("${access-token.expire-length}") long accessTokenExpireLength,
        @Value("${access-token.guest-expire-length}") long guestAccessTokenExpireLength,
        @Value("${refresh-token.expire-length}") long refreshTokenExpireLength) {

}
