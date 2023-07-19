package harustudy.backend.exception;

public class EntityNotFoundException extends RuntimeException {

    public static class StudyNotFound extends EntityNotFoundException {

    }

    public static class MemberNotFound extends EntityNotFoundException {

    }

    public static class PomodoroProgressNotFound extends EntityNotFoundException {

    }

    public static class PomodoroRecordNotFound extends EntityNotFoundException {

    }
}
