package harustudy.backend.auth.domain;

import harustudy.backend.auth.exception.RefreshTokenExpiredException;
import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.member.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class RefreshToken extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    private LocalDateTime expireDateTime;

    public RefreshToken(Member member, long expireLength) {
        this.member = member;
        this.uuid = UUID.randomUUID();
        this.expireDateTime = LocalDateTime.now().plus(expireLength, ChronoUnit.MILLIS);
    }

    public void validateExpired() {
        if (expireDateTime.isBefore(LocalDateTime.now())) {
            throw new RefreshTokenExpiredException();
        }
    }

    public RefreshToken updateExpireDateTime(long expireLength) {
        this.expireDateTime = LocalDateTime.now().plus(expireLength, ChronoUnit.MILLIS);
        return this;
    }

    public void updateUuidAndExpireDateTime(long expireLength) {
        this.uuid = UUID.randomUUID();
        this.expireDateTime = LocalDateTime.now().plus(expireLength, ChronoUnit.MILLIS);
    }
}
