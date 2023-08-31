package harustudy.backend.room.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.exception.PomodoroRoomNameLengthException;
import harustudy.backend.room.exception.PomodoroTimePerCycleException;
import harustudy.backend.room.exception.PomodoroTotalCycleException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroRoom extends BaseTimeEntity {

    private static final int MIN_NAME_LENGTH = 1;
    private static final int MAX_NAME_LENGTH = 10;

    private static final int MIN_TOTAL_CYCLE = 1;
    private static final int MAX_TOTAL_CYCLE = 8;

    private static final int MIN_TIME_PER_CYCLE = 20;
    private static final int MAX_TIME_PER_CYCLE = 60;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 10)
    private String name;

    @NotNull
    private Integer totalCycle;

    @NotNull
    private Integer timePerCycle;

    @OneToMany(mappedBy = "pomodoroRoom")
    private List<PomodoroProgress> pomodoroProgresses = new ArrayList<>();

    public PomodoroRoom(@NotNull String name, @NotNull Integer totalCycle,
            @NotNull Integer timePerCycle) {
        validate(name, totalCycle, timePerCycle);
        this.totalCycle = totalCycle;
        this.timePerCycle = timePerCycle;
        this.name = name;
    }

    private void validate(String name, Integer totalCycle, Integer timePerCycle) {
        validateName(name);
        validateTotalCycle(totalCycle);
        validateTimePerCycle(timePerCycle);
    }

    private void validateName(String name) {
        if (name.length() < MIN_NAME_LENGTH || name.length() > MAX_NAME_LENGTH) {
            throw new PomodoroRoomNameLengthException();
        }
    }

    private void validateTotalCycle(Integer totalCycle) {
        if (totalCycle < MIN_TOTAL_CYCLE || totalCycle > MAX_TOTAL_CYCLE) {
            throw new PomodoroTotalCycleException();
        }
    }

    private void validateTimePerCycle(Integer timePerCycle) {
        if (timePerCycle < MIN_TIME_PER_CYCLE || timePerCycle > MAX_TIME_PER_CYCLE) {
            throw new PomodoroTimePerCycleException();
        }
    }
}
