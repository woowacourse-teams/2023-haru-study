package harustudy.backend.participantcode.domain;

import harustudy.backend.study.domain.PomodoroStudy;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ParticipantCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private PomodoroStudy pomodoroStudy;

    @Column(unique = true, length = 6)
    private String code;

    @Transient
    private GenerationStrategy generationStrategy;

    public ParticipantCode(PomodoroStudy pomodoroStudy, GenerationStrategy generationStrategy) {
        this.pomodoroStudy = pomodoroStudy;
        this.generationStrategy = generationStrategy;
        this.code = generationStrategy.generate();
    }

    public void regenerate() {
        String generated = code;
        while (code.equals(generated)) {
            generated = generationStrategy.generate();
        }
        code = generated;
    }
}
