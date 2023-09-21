package harustudy.backend.participantcode.domain;

import java.time.LocalDateTime;

public interface GenerationStrategy {

    String generate();

    LocalDateTime getCreatedDate();
}
