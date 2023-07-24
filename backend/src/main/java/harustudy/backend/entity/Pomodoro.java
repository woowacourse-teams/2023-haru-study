package harustudy.backend.entity;

import harustudy.backend.exception.StudyTimePerCycleException;
import harustudy.backend.exception.StudyTotalCycleException;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Pomodoro extends Study {

    private final static int MIN_TOTAL_CYCLE = 1;
    private final static int MAX_TOTAL_CYCLE = 8;
    private final static int MIN_TIME_PER_CYCLE = 20;
    private final static int MAX_TIME_PER_CYCLE = 40;

    @NotNull
    private Integer totalCycle;

    @NotNull
    private Integer timePerCycle;

    public Pomodoro(@NotNull String name, @NotNull Integer totalCycle,
            @NotNull Integer timePerCycle, @NotNull ParticipantCode participantCode) {
        super(name, participantCode);
        validateTotalCycle(totalCycle);
        validateTimePerCycle(timePerCycle);
        this.totalCycle = totalCycle;
        this.timePerCycle = timePerCycle;
    }

    private void validateTotalCycle(Integer totalCycle) {
        if (totalCycle < MIN_TOTAL_CYCLE || totalCycle > MAX_TOTAL_CYCLE) {
            throw new StudyTotalCycleException();
        }
    }

    private void validateTimePerCycle(Integer timePerCycle) {
        if (timePerCycle < MIN_TIME_PER_CYCLE || timePerCycle > MAX_TIME_PER_CYCLE) {
            throw new StudyTimePerCycleException();
        }
    }
}
