package harustudy.backend.content.repository;

import harustudy.backend.content.domain.Content;
import harustudy.backend.participant.domain.Participant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository extends JpaRepository<Content, Long> {

    List<Content> findByParticipant(Participant participant);
}
