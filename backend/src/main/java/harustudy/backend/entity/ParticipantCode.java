package harustudy.backend.entity;

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
    private Study study;

    @Column(unique = true, length = 6)
    private String code;

    @Transient
    private GenerationStrategy generationStrategy;

    public ParticipantCode(Study study, GenerationStrategy generationStrategy) {
        this.study = study;
        this.generationStrategy = generationStrategy;
        this.code = generationStrategy.generate();
    }

    // TODO: 참여코드 생성에 대한 충돌 문제 개선
    public void regenerate() {
        String generated = code;
        while (code.equals(generated)) {
            generated = generationStrategy.generate();
        }
        code = generated;
    }
}
