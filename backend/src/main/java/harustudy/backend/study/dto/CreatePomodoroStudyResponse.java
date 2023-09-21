package harustudy.backend.study.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.study.domain.PomodoroStudy;

public record CreatePomodoroStudyResponse(@JsonIgnore Long studyId, String participantCode) {

    public static CreatePomodoroStudyResponse from(PomodoroStudy savedStudy,
            ParticipantCode participantCode) {
        return new CreatePomodoroStudyResponse(savedStudy.getId(), participantCode.getCode());
    }
}
