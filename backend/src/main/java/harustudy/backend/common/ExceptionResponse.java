package harustudy.backend.common;

public record ExceptionResponse(Integer code, String message) {

    public static ExceptionResponse from(ExceptionSituation exceptionSituation) {
        return new ExceptionResponse(exceptionSituation.getErrorCode(), exceptionSituation.getMessage());
    }
}
