package harustudy.backend.study.dto;

import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.study.domain.Study;

public record CreatePomodoroStudyDto(Long studyId, String participantCode) {

    public static CreatePomodoroStudyDto from(Study study, ParticipantCode participantCode) {
        return new CreatePomodoroStudyDto(study.getId(), participantCode.getCode());
    }
}
