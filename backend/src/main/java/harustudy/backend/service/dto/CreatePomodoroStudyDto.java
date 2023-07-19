package harustudy.backend.service.dto;

import harustudy.backend.entity.ParticipantCode;
import harustudy.backend.entity.Study;

public record CreatePomodoroStudyDto(Long studyId, String participantCode) {

    public static CreatePomodoroStudyDto from(Study study, ParticipantCode participantCode) {
        return new CreatePomodoroStudyDto(study.getId(), participantCode.getCode());
    }
}
