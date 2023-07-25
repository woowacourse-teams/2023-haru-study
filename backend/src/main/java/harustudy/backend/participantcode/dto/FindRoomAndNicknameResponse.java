package harustudy.backend.participantcode.dto;

public record FindRoomAndNicknameResponse(Long studyId, String studyName, String nickname) {

    public FindRoomAndNicknameResponse(Long studyId, String studyName) {
        this(studyId, studyName, null);
    }
}
