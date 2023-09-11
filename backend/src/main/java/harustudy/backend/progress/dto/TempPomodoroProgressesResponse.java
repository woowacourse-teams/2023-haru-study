package harustudy.backend.progress.dto;

import java.util.List;

public record TempPomodoroProgressesResponse(List<PomodoroProgressResponse> progresses) {

    public static TempPomodoroProgressesResponse from(PomodoroProgressesResponse response) {
        if (response.progresses().isEmpty()) {
            return new TempPomodoroProgressesResponse(null);
        }
        return new TempPomodoroProgressesResponse(response.progresses());
    }
}
