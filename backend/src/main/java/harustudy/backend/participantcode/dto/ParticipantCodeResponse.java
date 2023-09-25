package harustudy.backend.participantcode.dto;

import harustudy.backend.participantcode.domain.ParticipantCode;

public record ParticipantCodeResponse(String participantCode) {

    public static ParticipantCodeResponse from(ParticipantCode participantCode) {
        return new ParticipantCodeResponse(participantCode.getCode());
    }
}
