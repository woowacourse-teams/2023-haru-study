package harustudy.backend.content.dto;

import java.util.Map;

public record WritePlanRequest(Long participantId, Map<String, String> plan) {

}
