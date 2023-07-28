package harustudy.backend.progress.dto;

import harustudy.backend.progress.domain.PomodoroProgress;

public record PomodoroProgressResponse(Boolean isDone, Integer currentCycle, String step) {

    public static PomodoroProgressResponse from(PomodoroProgress pomodoroProgress) {
        return new PomodoroProgressResponse(pomodoroProgress.isDone(), pomodoroProgress.getCurrentCycle(),
                pomodoroProgress.getPomodoroStatus().name().toLowerCase());
    }
}
