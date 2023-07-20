package harustudy.backend.controller.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class StudyExceptionAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleBindException(
            MethodArgumentNotValidException e) {
        return ResponseEntity.badRequest()
                .body(new ExceptionResponse(e.getMessage()));
    }
}
