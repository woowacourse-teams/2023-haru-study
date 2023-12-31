package harustudy.backend.participant.dto;

import harustudy.backend.participant.domain.Participant;

public record ParticipantResponse(Long participantId, String nickname, Boolean isHost) {

    public static ParticipantResponse from(Participant participant) {
        return new ParticipantResponse(participant.getId(), participant.getNickname(), participant.getIsHost());
    }
}
