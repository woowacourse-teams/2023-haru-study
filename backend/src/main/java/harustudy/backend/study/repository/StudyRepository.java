package harustudy.backend.study.repository;

import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.study.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Long> {

    Study findByParticipantCode(ParticipantCode participantCode);
}
