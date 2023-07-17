package harustudy.backend.entity;

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
}
