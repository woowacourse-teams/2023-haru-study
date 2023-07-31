package harustudy.backend.content.dto;

import java.util.Map;

public record PomodoroContentResponse(Integer cycle, Map<String, String> plan,
                                      Map<String, String> retrospect) {

}
