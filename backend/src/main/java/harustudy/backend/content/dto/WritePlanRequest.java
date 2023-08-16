package harustudy.backend.content.dto;

import java.util.Map;

public record WritePlanRequest(Long progressId, Map<String, String> plan) {

}
