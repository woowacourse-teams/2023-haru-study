package harustudy.backend.auth.exception;

import harustudy.backend.common.exception.HaruStudyException;

public class InvalidAccessTokenException extends HaruStudyException {

    public InvalidAccessTokenException() {

    }

    public InvalidAccessTokenException(Exception e) {
        super(e);
    }
}
