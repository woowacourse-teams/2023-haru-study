package harustudy.backend.controller;

import harustudy.backend.service.dto.CreatePomodoroStudyDto;

public record CreatePomodoroStudyResponse(String participantCode) {

    public static CreatePomodoroStudyResponse of(CreatePomodoroStudyDto createPomodoroStudyDto) {
        return new CreatePomodoroStudyResponse(createPomodoroStudyDto.participantCode());
    }
}
