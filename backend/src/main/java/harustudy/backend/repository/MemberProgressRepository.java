package harustudy.backend.repository;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.MemberProgress;
import harustudy.backend.entity.Study;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberProgressRepository<T extends MemberProgress> extends JpaRepository<T, Long> {

    Optional<T> findByStudyAndMember(Study study, Member member);
}
