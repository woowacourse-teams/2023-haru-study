package harustudy.backend.progress.exception;

import harustudy.backend.common.HaruStudyException;

public class InvalidPomodoroProgressException extends HaruStudyException {

    public static class UnavailableToProceed extends InvalidPomodoroProgressException {

    }
}
