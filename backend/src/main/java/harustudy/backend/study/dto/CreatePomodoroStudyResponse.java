package harustudy.backend.study.dto;

public record CreatePomodoroStudyResponse(String participantCode) {

    public static CreatePomodoroStudyResponse of(CreatePomodoroStudyDto createPomodoroStudyDto) {
        return new CreatePomodoroStudyResponse(createPomodoroStudyDto.participantCode());
    }
}
