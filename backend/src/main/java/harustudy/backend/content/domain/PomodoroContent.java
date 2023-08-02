package harustudy.backend.content.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.common.MapStringConverter;
import harustudy.backend.progress.domain.PomodoroProgress;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroContent extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pomodoro_progress_id")
    private PomodoroProgress pomodoroProgress;

    @NotNull
    private Integer cycle;

    @Column(name = "plan", columnDefinition = "text")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> plan = new HashMap<>();

    @Column(name = "retrospect", columnDefinition = "text")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> retrospect = new HashMap<>();

    public PomodoroContent(PomodoroProgress pomodoroProgress, @NotNull Integer cycle) {
        this.pomodoroProgress = pomodoroProgress;
        this.cycle = cycle;
        this.plan = Map.of();
        this.retrospect = Map.of();
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

    public boolean hasEmptyPlan() {
        return plan.isEmpty();
    }
}
