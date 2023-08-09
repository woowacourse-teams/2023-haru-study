package harustudy.backend.common;

import harustudy.backend.member.exception.MemberNotParticipatedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    Logger defaultLog = LoggerFactory.getLogger(ExceptionAdvice.class);
    Logger exceptionLog = LoggerFactory.getLogger("ExceptionLogger");

    @ExceptionHandler(MemberNotParticipatedException.class)
    public ResponseEntity<ExceptionResponse> handleMemberNotParticipatedException(
            MemberNotParticipatedException e) {
        defaultLog.error(e.getMessage());
        exceptionLog.error(e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(MemberNotParticipatedException.CODE,
                        MemberNotParticipatedException.MESSAGE));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleBindException(
            MethodArgumentNotValidException e) {
        defaultLog.error(e.getMessage());
        exceptionLog.error(e.getMessage(), e);
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(null, e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Void> handleException(Exception e) {
        defaultLog.error(e.getMessage());
        exceptionLog.error(e.getMessage(), e);
        return ResponseEntity.internalServerError().build();
    }
}
