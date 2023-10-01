package harustudy.backend.admin.dto;

import harustudy.backend.participantcode.domain.ParticipantCode;

public record AdminParticipantCodeResponse(Long id, Long studyId, String code) {

    public static AdminParticipantCodeResponse from(ParticipantCode participantCode) {
        return new AdminParticipantCodeResponse(participantCode.getId(), participantCode.getStudy().getId(),
                participantCode.getCode());
    }
}

