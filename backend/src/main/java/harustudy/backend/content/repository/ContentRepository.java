package harustudy.backend.content.repository;

import harustudy.backend.content.domain.Content;
import harustudy.backend.participant.domain.Participant;
import java.util.List;

import harustudy.backend.study.domain.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ContentRepository extends JpaRepository<Content, Long> {

    List<Content> findByParticipant(Participant participant);

    @Query("select c from Content c join c.participant p join p.study s where s = :study")
    Page<Content> findAllByStudy(Pageable pageable, Study study);
}
