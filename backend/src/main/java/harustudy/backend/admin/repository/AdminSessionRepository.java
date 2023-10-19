package harustudy.backend.admin.repository;

import harustudy.backend.admin.entity.AdminSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface AdminSessionRepository extends JpaRepository<AdminSession, Long> {

    Optional<AdminSession> findByUuid(UUID uuid);
}
