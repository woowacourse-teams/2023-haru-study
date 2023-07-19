package harustudy.backend.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Type;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroRecord extends MemberRecord {

    @NotNull
    private Integer cycle;

    @Type(JsonType.class)
    @Column(name = "plan", columnDefinition = "longtext")
    private Map<String, String> plan = new HashMap<>();

    @Type(JsonType.class)
    @Column(name = "retrospect", columnDefinition = "longtext")
    private Map<String, String> retrospect = new HashMap<>();

    // TODO: 삭제 예정
    @NotNull
    @Enumerated(EnumType.STRING)
    private TemplateVersion templateVersion;

    public PomodoroRecord(MemberProgress memberProgress, @NotNull Integer cycle,
            Map<String, String> plan, Map<String, String> retrospect,
            @NotNull TemplateVersion templateVersion) {
        super(memberProgress);
        this.cycle = cycle;
        this.plan = plan;
        this.retrospect = retrospect;
        this.templateVersion = templateVersion;
    }

    public void changeRetrospect(Map<String, String> retrospect) {
        this.retrospect = retrospect;
    }

    public boolean hasSameCycleWith(PomodoroProgress pomodoroProgress) {
        return cycle.equals(pomodoroProgress.getCurrentCycle());
    }
}
