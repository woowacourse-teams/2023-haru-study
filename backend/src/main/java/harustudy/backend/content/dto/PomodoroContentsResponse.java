package harustudy.backend.content.dto;

import java.util.List;

public record PomodoroContentsResponse(List<PomodoroContentResponse> content) {

    public static PomodoroContentsResponse from(List<PomodoroContentResponse> content) {
        return new PomodoroContentsResponse(content);
    }
}
