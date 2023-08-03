package harustudy.backend.common;

// TODO: 예외 나누기
public class EntityNotFoundException extends RuntimeException {

    public static class RoomNotFound extends EntityNotFoundException {

    }

    public static class MemberNotFound extends EntityNotFoundException {

    }

    public static class PomodoroProgressNotFound extends EntityNotFoundException {

    }

    public static class PomodoroContentNotFound extends EntityNotFoundException {

    }

    public static class ParticipantCodeNotFound extends EntityNotFoundException {

    }
}
