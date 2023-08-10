package harustudy.backend.auth.domain;

import harustudy.backend.auth.exception.RefreshTokenExpiredException;
import harustudy.backend.common.BaseTimeEntity;
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
    @JoinColumn(name = "oauth_member_id")
    private OauthMember oauthMember;

    @Column(columnDefinition = "BINARY(16)")
    private UUID uuid;

    private LocalDateTime expireDateTime;

    public RefreshToken(OauthMember oauthMember, long expireLength) {
        this.oauthMember = oauthMember;
        this.uuid = UUID.randomUUID();
        this.expireDateTime = LocalDateTime.now().plus(expireLength, ChronoUnit.MILLIS);
    }

    public void validateExpired() {
        if (expireDateTime.isBefore(LocalDateTime.now())) {
            throw new RefreshTokenExpiredException();
        }
    }

    public void updateUuidAndExpireDateTime(long expireLength) {
        this.uuid = UUID.randomUUID();
        this.expireDateTime = LocalDateTime.now().plus(expireLength, ChronoUnit.MILLIS);
    }
}
