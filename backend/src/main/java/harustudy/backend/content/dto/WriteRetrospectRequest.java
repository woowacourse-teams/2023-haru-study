package harustudy.backend.content.dto;

import java.util.Map;

public record WriteRetrospectRequest(Long participantId, Map<String, String> retrospect) {

}
