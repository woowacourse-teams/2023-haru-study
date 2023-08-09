package harustudy.backend.common;

import harustudy.backend.member.exception.MemberNotParticipatedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionAdvice {

    Logger defaultLog = LoggerFactory.getLogger(ExceptionAdvice.class);
    Logger exceptionLog = LoggerFactory.getLogger("ExceptionLogger");

    @ExceptionHandler(HaruStudyException.class)
    public ResponseEntity<ExceptionResponse> handleMemberNotParticipatedException(
            HaruStudyException e) {
        ExceptionSituation exceptionSituation = ExceptionMapper.getSituationOf(e);
        defaultLog.error(exceptionSituation.getMessage());
        exceptionLog.error(exceptionSituation.getMessage(), e);
        return ResponseEntity.status(exceptionSituation.getStatusCode())
                .body(ExceptionResponse.from(exceptionSituation));
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
