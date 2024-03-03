package harustudy.backend.participant.repository;

import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.exception.ParticipantNotFoundException;
import harustudy.backend.study.domain.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {

    Optional<Participant> findByStudyAndMember(Study study, Member member);

    List<Participant> findByStudy(Study study);

    default Participant findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(ParticipantNotFoundException::new);
    }
}
