package harustudy.backend.participantcode.domain;

import java.time.LocalDateTime;

public interface GenerationStrategy {

//    1 Day
    Long EXPIRATION_PERIOD_IN_SECONDS = 60L * 60 * 24;

    String generate();

    LocalDateTime getCreatedDate();
}
