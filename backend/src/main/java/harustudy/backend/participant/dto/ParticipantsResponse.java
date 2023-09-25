package harustudy.backend.participant.dto;

import java.util.List;

public record ParticipantsResponse(List<ParticipantResponse> participants) {

    public static ParticipantsResponse from(List<ParticipantResponse> responses) {
        return new ParticipantsResponse(responses);
    }
}
