package harustudy.backend.auth.exception;

import harustudy.backend.common.exception.HaruStudyException;

public class OauthServerException extends HaruStudyException {

    public OauthServerException() {
    }

    public OauthServerException(String message) {
        super(message);
    }
}
