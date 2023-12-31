package harustudy.backend.admin.entity;

import harustudy.backend.admin.exception.AdminSessionExpiredException;
import harustudy.backend.common.BaseTimeEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Getter
@Entity
public class AdminSession extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    private LocalDateTime expiredDateTime;

    public AdminSession() {
        this.uuid = UUID.randomUUID();
        this.expiredDateTime = LocalDateTime.now()
                .plus(1L, ChronoUnit.HOURS);
    }

    public void validateIsExpired() {
        if (expiredDateTime.isBefore(LocalDateTime.now())) {
            throw new AdminSessionExpiredException();
        }
    }
}
