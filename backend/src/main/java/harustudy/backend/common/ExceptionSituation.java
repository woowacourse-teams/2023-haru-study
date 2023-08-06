package harustudy.backend.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ExceptionSituation {

    private final String message;
    private final HttpStatus statusCode;
    private final Integer errorCode;

    private ExceptionSituation(String message, HttpStatus statusCode, Integer errorCode) {
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }

    public static ExceptionSituation of(String message, HttpStatus statusCode) {
        return of(message, statusCode, null);
    }

    public static ExceptionSituation of(String message, HttpStatus statusCode, Integer errorCode) {
        return new ExceptionSituation(message, statusCode, errorCode);
    }
}