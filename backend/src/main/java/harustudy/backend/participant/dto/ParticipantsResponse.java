package harustudy.backend.participant.dto;

import harustudy.backend.participant.domain.Participant;

import java.util.List;

public record ParticipantsResponse(List<ParticipantResponse> participants) {

    public static ParticipantsResponse from(List<ParticipantResponse> responses) {
        return new ParticipantsResponse(responses);
    }

    public static ParticipantsResponse fromParticipants(List<Participant> participants) {
        return from(participants.stream()
                .map(ParticipantResponse::from)
                .toList());
    }
}
