package harustudy.backend.auth.repository;

import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.member.domain.Member;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    Optional<RefreshToken> findByUuid(UUID refreshToken);

    Optional<RefreshToken> findByMember(Member member);
}
