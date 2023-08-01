package harustudy.backend.content.dto;

import java.util.Map;

public record WritePlanRequest(Long memberId, Map<String, String> plan) {

}
