package harustudy.backend.common;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ExceptionResponse(Integer code, String message) {

    public static ExceptionResponse from(ExceptionSituation exceptionSituation) {
        return new ExceptionResponse(exceptionSituation.getErrorCode(), exceptionSituation.getMessage());
    }
}
