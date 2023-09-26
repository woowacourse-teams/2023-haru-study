package harustudy.backend.polling.dto;

public record SubmitterResponse(String nickname, Boolean submitted) {

    public static SubmitterResponse of(String nickname, Boolean submitted) {
        return new SubmitterResponse(nickname, submitted);
    }
}
