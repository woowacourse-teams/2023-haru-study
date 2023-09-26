package harustudy.backend.content.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.common.MapStringConverter;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.study.domain.Study;
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
import java.util.HashMap;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Content extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_id")
    private Participant participant;

    @NotNull
    private Integer cycle;

    @Column(name = "plan", columnDefinition = "text")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> plan = new HashMap<>();

    @Column(name = "retrospect", columnDefinition = "text")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> retrospect = new HashMap<>();

    public Content(Participant participant, @NotNull Integer cycle) {
        this.participant = participant;
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

    public boolean hasSameCycleWith(Study study) {
        return cycle.equals(study.getCurrentCycle());
    }

    public boolean isPlanWritten() {
        return !plan.isEmpty();
    }

    public boolean isRetrospectWritten() {
        return !retrospect.isEmpty();
    }
}
