package harustudy.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@Entity
public class PomodoroProgress extends MemberProgress {

    @NotNull
    private Integer currentCycle;

    @Enumerated(value = EnumType.STRING)
    private StudyStatus studyStatus;

    protected PomodoroProgress() {
    }
}
