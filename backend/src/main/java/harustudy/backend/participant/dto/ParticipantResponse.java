package harustudy.backend.participant.dto;

import harustudy.backend.participant.domain.Participant;

public record ParticipantResponse(Long participantId, String nickname, Integer currentCycle,
                                  String step) {

    public static ParticipantResponse from(Participant participant) {
        return new ParticipantResponse(participant.getId(), participant.getNickname(),
                participant.getCurrentCycle(), participant.getStep().name().toLowerCase());
    }
}
