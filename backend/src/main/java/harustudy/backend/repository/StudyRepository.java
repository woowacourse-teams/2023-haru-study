package harustudy.backend.repository;

import harustudy.backend.entity.ParticipantCode;
import harustudy.backend.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Long> {

    Study findByParticipantCode(ParticipantCode participantCode);
}
