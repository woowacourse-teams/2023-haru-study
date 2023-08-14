package harustudy.backend.content.dto;

import java.util.Map;

public record WritePlanRequestV3(Long progressId, Map<String, String> plan) {

}
