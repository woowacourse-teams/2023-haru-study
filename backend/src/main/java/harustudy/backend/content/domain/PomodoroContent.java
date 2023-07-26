package harustudy.backend.content.domain;

import harustudy.backend.progress.domain.MemberProgress;
import harustudy.backend.progress.domain.PomodoroProgress;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroContent extends MemberContent {

    @NotNull
    private Integer cycle;

    @Column(name = "plan", columnDefinition = "longtext")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> plan = new HashMap<>();

    @Column(name = "retrospect", columnDefinition = "longtext")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> retrospect = new HashMap<>();

    public PomodoroContent(MemberProgress memberProgress, @NotNull Integer cycle) {
        this(memberProgress, cycle, Map.of(), Map.of());
    }

    public PomodoroContent(MemberProgress memberProgress, @NotNull Integer cycle,
                           Map<String, String> plan, Map<String, String> retrospect) {
        super(memberProgress);
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
}
