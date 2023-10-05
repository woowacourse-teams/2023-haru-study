package harustudy.backend.common.exception;

public abstract class HaruStudyException extends RuntimeException {

    protected HaruStudyException() {
    }

    protected HaruStudyException(String message) {
        super(message);
    }
}
