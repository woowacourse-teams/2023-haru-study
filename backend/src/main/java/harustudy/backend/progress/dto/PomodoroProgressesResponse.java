package harustudy.backend.progress.dto;

import java.util.List;

public record PomodoroProgressesResponse(List<PomodoroProgressResponse> pomodoroProgresses) {

    public static PomodoroProgressesResponse from(List<PomodoroProgressResponse> responses) {
        return new PomodoroProgressesResponse(responses);
    }
}
