package harustudy.backend.content.dto;

import java.util.Map;

public record WriteRetrospectRequestV3(Long progressId, Map<String, String> retrospect) {

}
