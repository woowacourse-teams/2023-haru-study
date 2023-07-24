package harustudy.backend.participantcode.dto;

public record StudyAuthResponse(Long studyId, String studyName, String nickname) {

    public StudyAuthResponse(Long studyId, String studyName) {
        this(studyId, studyName, null);
    }
}
