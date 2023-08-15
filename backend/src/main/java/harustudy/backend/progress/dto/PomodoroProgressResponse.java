package harustudy.backend.progress.dto;

import harustudy.backend.progress.domain.PomodoroProgress;

public record PomodoroProgressResponse(Long progressId, String nickname, Integer currentCycle,
                                       String step) {

    public static PomodoroProgressResponse from(PomodoroProgress pomodoroProgress) {
        return new PomodoroProgressResponse(pomodoroProgress.getId(), pomodoroProgress.getNickname(),
                pomodoroProgress.getCurrentCycle(), pomodoroProgress.getPomodoroStatus().name().toLowerCase());
    }
}
