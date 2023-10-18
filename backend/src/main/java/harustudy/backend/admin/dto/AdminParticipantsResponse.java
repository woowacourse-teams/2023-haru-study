package harustudy.backend.admin.dto;

import harustudy.backend.participant.domain.Participant;
import java.util.List;
import org.springframework.data.domain.Page;

public record AdminParticipantsResponse(Integer totalPage, List<AdminParticipantResponse> data) {

    public static AdminParticipantsResponse from(Page<Participant> participantPages) {
        List<AdminParticipantResponse> responses = participantPages.map(AdminParticipantResponse::from)
                .toList();

        return new AdminParticipantsResponse(participantPages.getTotalPages(), responses);
    }
}
