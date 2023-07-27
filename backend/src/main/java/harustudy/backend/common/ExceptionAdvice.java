package harustudy.backend.common;

import harustudy.backend.member.exception.MemberNotParticipatedException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(MemberNotParticipatedException.class)
    public ResponseEntity<ExceptionResponse> handleMemberNotParticipatedException(
            MemberNotParticipatedException e) {
        log.info(e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ExceptionResponse(MemberNotParticipatedException.CODE,
                        MemberNotParticipatedException.MESSAGE));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleBindException(
            MethodArgumentNotValidException e) {
        log.info(e.getMessage());
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(null, e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Void> handleException(Exception e) {
        log.info(e.getMessage());
        return ResponseEntity.internalServerError().build();
    }
}
