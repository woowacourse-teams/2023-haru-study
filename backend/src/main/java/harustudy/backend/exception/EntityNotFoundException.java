package harustudy.backend.exception;

import harustudy.backend.entity.PomodoroProgress;

public class EntityNotFoundException extends RuntimeException {

    public static class StudyNotFound extends EntityNotFoundException {
    }

    public static class MemberNotFound extends EntityNotFoundException {
    }

    public static class PomodoroProgressNotFound extends EntityNotFoundException {
    }
}
