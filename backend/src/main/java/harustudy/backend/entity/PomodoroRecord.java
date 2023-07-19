package harustudy.backend.entity;

import harustudy.backend.repository.dto.MapStringConverter;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
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

    @Column(name = "plan", columnDefinition = "longtext")
    @Convert(converter = MapStringConverter.class)
    private Map<String, String> plan = new HashMap<>();

    @Type(JsonType.class)
    @Column(name = "retrospect", columnDefinition = "longtext")
    private Map<String, String> retrospect = new HashMap<>();

    @NotNull
    @Enumerated(EnumType.STRING)
    private TemplateVersion templateVersion;
}
