package harustudy.backend.service.dto;

import harustudy.backend.entity.ParticipantCode;

public record CreatePomodoroStudyResponse(String participantCode) {

    public static CreatePomodoroStudyResponse of(ParticipantCode participantCode) {
        return new CreatePomodoroStudyResponse(participantCode.getCode());
    }
}
