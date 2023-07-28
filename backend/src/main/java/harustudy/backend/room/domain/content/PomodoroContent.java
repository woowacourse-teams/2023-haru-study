package harustudy.backend.room.domain.content;

import harustudy.backend.room.domain.progress.PomodoroProgress;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroContent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pomodoro_progress_id")
    private PomodoroProgress pomodoroProgress;

    @NotNull
    private Integer cycle;

    @Column(name = "plan", columnDefinition = "longtext")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> plan = new HashMap<>();

    @Column(name = "retrospect", columnDefinition = "longtext")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> retrospect = new HashMap<>();

    public PomodoroContent(PomodoroProgress pomodoroProgress, @NotNull Integer cycle) {
        this(pomodoroProgress, cycle, Map.of(), Map.of());
    }

    public PomodoroContent(PomodoroProgress pomodoroProgress, @NotNull Integer cycle,
                           Map<String, String> plan, Map<String, String> retrospect) {
        this.pomodoroProgress = pomodoroProgress;
        this.cycle = cycle;
        this.plan = plan;
        this.retrospect = retrospect;
    }

    public void changePlan(Map<String, String> plan) {
        this.plan = plan;
    }

    public void changeRetrospect(Map<String, String> retrospect) {
        this.retrospect = retrospect;
    }

    public boolean hasSameCycleWith(PomodoroProgress pomodoroProgress) {
        return cycle.equals(pomodoroProgress.getCurrentCycle());
    }

    public boolean isCycle(Integer currentCycle) {
        return this.cycle.equals(currentCycle);
    }
}
