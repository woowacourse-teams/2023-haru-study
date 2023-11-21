package harustudy.backend.common.exception;

public abstract class HaruStudyException extends RuntimeException {

    protected HaruStudyException() {
    }

    protected HaruStudyException(Exception e) {
        super(e);
    }

    protected HaruStudyException(String message) {
        super(message);
    }
}
