package harustudy.backend.participant.domain;

public enum Step {

    WAITING,
    PLANNING,
    STUDYING,
    RETROSPECT,
    DONE;

    public Step getNext() {
        return switch (this) {
            case WAITING -> PLANNING;
            case PLANNING -> STUDYING;
            case STUDYING -> RETROSPECT;
            case RETROSPECT -> PLANNING;
            default -> DONE;
        };
    }
}
