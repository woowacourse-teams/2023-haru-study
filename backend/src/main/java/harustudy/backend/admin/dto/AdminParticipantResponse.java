package harustudy.backend.admin.dto;

import harustudy.backend.participant.domain.Participant;

public record AdminParticipantResponse(Long id, Long studyId, Long memberId, String nickname, Boolean isHost) {

    public static AdminParticipantResponse from(Participant participant) {
        return new AdminParticipantResponse(participant.getId(), participant.getStudy().getId(),
                participant.getMember().getId(), participant.getNickname(), participant.getIsHost());
    }
}
