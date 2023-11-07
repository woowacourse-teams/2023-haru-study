package harustudy.backend.admin.dto;

import harustudy.backend.participantcode.domain.ParticipantCode;
import java.util.List;
import org.springframework.data.domain.Page;

public record AdminParticipantCodesResponse(Integer totalPage, List<AdminParticipantCodeResponse> data) {

    public static AdminParticipantCodesResponse from(Page<ParticipantCode> participantCodePages) {
        List<AdminParticipantCodeResponse> data = participantCodePages.map(AdminParticipantCodeResponse::from)
                .toList();

        return new AdminParticipantCodesResponse(participantCodePages.getTotalPages(), data);
    }
}
