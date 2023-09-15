package harustudy.backend.study.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.study.domain.Study;

public record CreateStudyResponse(@JsonIgnore Long studyId, String participantCode) {

    public static CreateStudyResponse from(Study savedStudy,
            ParticipantCode participantCode) {
        return new CreateStudyResponse(savedStudy.getId(), participantCode.getCode());
    }
}
