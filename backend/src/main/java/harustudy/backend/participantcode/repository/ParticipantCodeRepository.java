package harustudy.backend.participantcode.repository;

import harustudy.backend.participantcode.domain.ParticipantCode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ParticipantCodeRepository extends JpaRepository<ParticipantCode, Long> {

    Optional<ParticipantCode> findByCode(@Param("code") String code);
}