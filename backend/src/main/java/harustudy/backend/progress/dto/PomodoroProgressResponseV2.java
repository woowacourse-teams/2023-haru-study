package harustudy.backend.progress.dto;

import harustudy.backend.progress.domain.PomodoroProgress;

public record PomodoroProgressResponseV2(Integer currentCycle, String step) {

    public static PomodoroProgressResponseV2 from(PomodoroProgress pomodoroProgress) {
        return new PomodoroProgressResponseV2(pomodoroProgress.getCurrentCycle(),
                pomodoroProgress.getPomodoroStatus().name().toLowerCase());
    }
}
