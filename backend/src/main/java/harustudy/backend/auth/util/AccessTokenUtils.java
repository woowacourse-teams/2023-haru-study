package harustudy.backend.auth.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.auth.exception.InvalidAccessTokenException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

public class AccessTokenUtils {

    public static String issue(ObjectMapper objectMapper, Long subject, Long accessTokenExpireLength) {
        Date now = new Date();
        Date expireAt = new Date(now.getTime() + accessTokenExpireLength);
        RawToken rawToken = new RawToken(subject, expireAt);
        return stringify(objectMapper, rawToken);
    }

    private static String stringify(ObjectMapper objectMapper, RawToken rawToken) {
        try {
            return objectMapper.writeValueAsString(rawToken);
        } catch (JsonProcessingException e) {
            throw new InvalidAccessTokenException(e);
        }
    }

    public static Long parseSubject(ObjectMapper objectMapper, byte[] decrypted) {
        RawToken rawToken = toRawToken(objectMapper, decrypted);
        validateExpiration(rawToken);
        return rawToken.subject;
    }

    private static RawToken toRawToken(ObjectMapper objectMapper, byte[] decrypted) {
        String string = new String(decrypted, StandardCharsets.UTF_8);
        try {
            return objectMapper.readValue(string, RawToken.class);
        } catch (JsonProcessingException e) {
            throw new InvalidAccessTokenException(e);
        }
    }

    private static void validateExpiration(RawToken rawToken) {
        if (rawToken.expireAt.before(new Date())) {
            throw new InvalidAccessTokenException();
        }
    }

    @Getter
    @RequiredArgsConstructor
    private static class RawToken {

        private final Long subject;

        private final Date expireAt;
    }
}
