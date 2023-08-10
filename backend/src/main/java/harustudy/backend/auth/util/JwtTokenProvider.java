package harustudy.backend.auth.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import lombok.Builder;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    @Builder
    public String createAccessToken(String subject, Long accessTokenExpireLength, String secretKey) {
        Claims claims = generateClaims(subject, accessTokenExpireLength);

        return Jwts.builder()
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT")
                .setClaims(claims)
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8)),
                        SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims generateClaims(String subject, Long accessTokenExpireLength) {
        Date now = new Date();
        Date expiredAt = new Date(now.getTime() + accessTokenExpireLength);

        return Jwts.claims()
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiredAt);
    }
}
