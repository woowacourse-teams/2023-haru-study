package harustudy.backend.participant.domain;

public enum Step {

    PLANNING,
    STUDYING,
    RETROSPECT,
    DONE;

    public Step getNext() {
        return switch (this) {
            case PLANNING -> STUDYING;
            case STUDYING -> RETROSPECT;
            case RETROSPECT -> PLANNING;
            default -> DONE;
        };
    }
}
