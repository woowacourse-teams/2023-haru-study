package harustudy.backend.common;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionAdvice {

    @ExceptionHandler(HaruStudyException.class)
    public ResponseEntity<ExceptionResponse> handleHaruStudyException(HaruStudyException e) {
        ExceptionSituation exceptionSituation = ExceptionMapper.getSituationOf(e);
        log.info(exceptionSituation.getMessage());
        return ResponseEntity.status(exceptionSituation.getStatusCode())
                .body(ExceptionResponse.from(exceptionSituation));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Void> handleException(Exception e) {
        log.error(e.getMessage());
        return ResponseEntity.internalServerError().build();
    }
}
