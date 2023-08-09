package harustudy.backend.auth.repository;

import harustudy.backend.auth.domain.OauthMember;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OauthMemberRepository extends JpaRepository<OauthMember, Long> {

  Optional<OauthMember> findByEmail(String email);
}
