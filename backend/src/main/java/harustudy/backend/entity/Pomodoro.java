package harustudy.backend.entity;

import harustudy.backend.exception.StudyCycleCountException;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Pomodoro extends Study {

    private final static int MIN_CYCLE_COUNT = 1;
    private final static int MAX_CYCLE_COUNT = 8;

    @NotNull
    private Integer totalCycle;

    @NotNull
    private Integer timePerCycle;

    public Pomodoro(@NotNull String name, @NotNull Integer totalCycle,
            @NotNull Integer timePerCycle) {
        super(name);
        validateStudyCycleCount(totalCycle);
        this.totalCycle = totalCycle;
        this.timePerCycle = timePerCycle;
    }

    private void validateStudyCycleCount(Integer totalCycle) {
        if (totalCycle < MIN_CYCLE_COUNT || totalCycle > MAX_CYCLE_COUNT) {
            throw new StudyCycleCountException();
        }
    }
}
