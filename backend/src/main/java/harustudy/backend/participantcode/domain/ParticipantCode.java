package harustudy.backend.participantcode.domain;

import jakarta.persistence.Transient;
import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class ParticipantCode {

//    1 Day
    private static final Long EXPIRATION_PERIOD_IN_SECONDS = 60L * 60 * 24;

    private Long id;

//    @Indexed
    private String code;

//    @TimeToLive
    private Long expirationPeriod;

    @Transient
    private LocalDateTime createdDate;

    @Transient
    private GenerationStrategy generationStrategy;

    public ParticipantCode(GenerationStrategy generationStrategy) {
        this.id = null;
        this.generationStrategy = generationStrategy;
        this.code = generationStrategy.generate();
        this.expirationPeriod = EXPIRATION_PERIOD_IN_SECONDS;
        this.createdDate = LocalDateTime.now();
    }

    public void regenerate() {
        String generated = code;
        while (code.equals(generated)) {
            generated = generationStrategy.generate();
        }
        code = generated;
    }

    public boolean isExpired() {
        return createdDate.plusSeconds(EXPIRATION_PERIOD_IN_SECONDS).isBefore(LocalDateTime.now());
    }
}
