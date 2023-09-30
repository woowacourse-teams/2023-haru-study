package harustudy.backend.admin.entity;

import harustudy.backend.admin.exception.AdminSessionExpiredException;
import harustudy.backend.common.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@NoArgsConstructor
@Getter
@Entity
public class AdminSession extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;

    private UUID uuid;

    private LocalDateTime expiredDateTime;

    public AdminSession(UUID value) {
        this.uuid = value;
        this.expiredDateTime = LocalDateTime.now()
                .plus(1L, ChronoUnit.HOURS);
    }

    public void validateIsExpired() {
        if (expiredDateTime.isBefore(LocalDateTime.now())) {
            throw new AdminSessionExpiredException();
        }
    }
}
