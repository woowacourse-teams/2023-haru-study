package harustudy.backend.content.dto;

import java.util.Map;

public record WriteRetrospectRequest(Long memberId, Map<String, String> retrospect) {

}
