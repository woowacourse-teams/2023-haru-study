package harustudy.backend.admin.dto;

import harustudy.backend.content.domain.Content;

import java.util.Map;

public record AdminContentResponse(Long id, Long participantId, Integer cycle,
                                   Map<String, String> plan, Map<String, String> retrospect) {

    public static AdminContentResponse from(Content content) {
        return new AdminContentResponse(content.getId(), content.getParticipant().getId(), content.getCycle(),
                content.getPlan(), content.getRetrospect());
    }
}
