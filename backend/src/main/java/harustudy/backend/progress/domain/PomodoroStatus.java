package harustudy.backend.progress.domain;

public enum PomodoroStatus {

    PLANNING, STUDYING, RETROSPECT;

    public PomodoroStatus getNext() {
        return switch (this) {
            case PLANNING -> STUDYING;
            case STUDYING -> RETROSPECT;
            case RETROSPECT -> PLANNING;
        };
    }
}
