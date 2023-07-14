package harustudy.backend.entity;

import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import org.hibernate.annotations.Type;

@Getter
@Entity
public class Pomodoro extends Study {

    @NotNull
    private Integer totalCycle;

    @NotNull
    private Integer timePerCycle;

    @NotNull
    @Type(JsonType.class)
    @Column(name = "plan", columnDefinition = "longtext")
    private Map<String, String> plan = new HashMap<>();

    @NotNull
    @Type(JsonType.class)
    @Column(name = "retrospect", columnDefinition = "longtext")
    private Map<String, String> retrospect = new HashMap<>();

    @Enumerated(EnumType.STRING)
    private Version version;

    protected Pomodoro() {
    }
}
