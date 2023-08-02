package harustudy.backend.content.dto;

import harustudy.backend.content.domain.PomodoroContent;
import java.util.Map;

public record PomodoroContentResponse(Integer cycle, Map<String, String> plan,
                                      Map<String, String> retrospect) {

    public static PomodoroContentResponse from(PomodoroContent pomodoroContent) {
        return new PomodoroContentResponse(pomodoroContent.getCycle(), pomodoroContent.getPlan(),
                pomodoroContent.getRetrospect());
    }
}
