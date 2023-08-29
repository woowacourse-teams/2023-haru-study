package harustudy.backend.auth.util;

import harustudy.backend.auth.exception.InvalidAuthorizationHeaderException;
import java.util.Objects;
import org.springframework.stereotype.Component;

@Component
public class BearerAuthorizationParser {

    private static final String TOKEN_TYPE = "Bearer";
    private static final int TOKEN_TYPE_LOCATION = 0;
    private static final int ACCESS_TOKEN_LOCATION = 1;
    private static final int HEADER_SIZE = 2;

    public String parse(String authorizationHeader) {
        validateIsNonNull(authorizationHeader);
        String[] split = authorizationHeader.split(" ");
        if (split.length != HEADER_SIZE || !split[TOKEN_TYPE_LOCATION].equals(TOKEN_TYPE)) {
            throw new InvalidAuthorizationHeaderException();
        }
        return split[ACCESS_TOKEN_LOCATION];
    }

    private void validateIsNonNull(String authorizationHeader) {
        if (Objects.isNull(authorizationHeader)) {
            throw new InvalidAuthorizationHeaderException();
        }
    }
}

