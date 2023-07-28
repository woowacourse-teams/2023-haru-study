package harustudy.backend.room.dto.progress;

import harustudy.backend.room.domain.progress.PomodoroStatus;

public record RoomAndProgressStepResponse(String studyName, Integer totalCycle,
                                          Integer currentCycle,
                                          Integer timePerCycle, String step) {

    public RoomAndProgressStepResponse(String studyName, Integer totalCycle, Integer currentCycle,
                                       Integer timePerCycle, PomodoroStatus step) {
        this(studyName, totalCycle, currentCycle, timePerCycle, step.name().toLowerCase());
    }
}
