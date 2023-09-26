package harustudy.backend.participant.repository;

import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.exception.ParticipantNotFoundException;
import harustudy.backend.study.domain.Study;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findByStudyAndMember(Study study,
            Member member);

    @Query("select p from Participant p join fetch p.member where p.study = :study")
    List<Participant> findAllByStudyFetchMember(
            @Param("study") Study study);

    List<Participant> findByMember(Member member);

    List<Participant> findByStudy(Study study);

    default Participant findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(ParticipantNotFoundException::new);
    }
}
