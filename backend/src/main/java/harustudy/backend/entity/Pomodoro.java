package harustudy.backend.entity;

import harustudy.backend.exception.StudyNameLengthException;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Pomodoro extends Study {

    @NotNull
    private Integer totalCycle;

    @NotNull
    private Integer timePerCycle;

    public Pomodoro(@NotNull String name, @NotNull Integer totalCycle,
            @NotNull Integer timePerCycle) {
        super(name);
        this.totalCycle = totalCycle;
        this.timePerCycle = timePerCycle;
    }
}
