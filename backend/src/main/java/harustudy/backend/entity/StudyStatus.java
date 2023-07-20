package harustudy.backend.entity;

public enum StudyStatus {

    PLANNING, STUDYING, RETROSPECT;

    public StudyStatus getNext() {
        return switch (this) {
            case PLANNING -> STUDYING;
            case STUDYING -> RETROSPECT;
            case RETROSPECT -> PLANNING;
        };
    }
}
