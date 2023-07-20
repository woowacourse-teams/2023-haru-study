package harustudy.backend.repository;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.MemberProgress;
import harustudy.backend.entity.Study;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface MemberProgressRepository<T extends MemberProgress> extends JpaRepository<T, Long> {

    Optional<T> findByStudyAndMember(Study study, Member member);

    List<T> findByStudy(@Param("study") Study study);
}
