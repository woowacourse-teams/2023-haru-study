package harustudy.backend.participantcode.repository;

import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.study.domain.Study;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ParticipantCodeRepository extends JpaRepository<ParticipantCode, Long> {

    Optional<ParticipantCode> findByCode(String code);

    Optional<ParticipantCode> findByStudy(Study study);
}
