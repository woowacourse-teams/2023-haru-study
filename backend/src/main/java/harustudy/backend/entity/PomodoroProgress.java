package harustudy.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Entity
public class PomodoroProgress extends MemberProgress {

    @NotNull
    private Integer currentCycle;

    @Enumerated(value = EnumType.STRING)
    private StudyStatus studyStatus;

    public PomodoroRecord findPomodoroRecordByCycle(Integer cycle) {
        return getMemberRecords().stream()
                .filter(pomodoro -> ((PomodoroRecord) pomodoro).getCycle().equals(cycle))
                .map(record -> (PomodoroRecord) record)
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }

    public List<PomodoroRecord> getPomodoroRecords() {
        return getMemberRecords().stream()
                .map(record -> (PomodoroRecord) record)
                .toList();
    }
}
