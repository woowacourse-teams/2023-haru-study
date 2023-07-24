package harustudy.backend.progress.repository;

import harustudy.backend.member.domain.Member;
import harustudy.backend.progress.domain.MemberProgress;
import harustudy.backend.study.domain.Study;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface MemberProgressRepository<T extends MemberProgress> extends JpaRepository<T, Long> {

    Optional<T> findByStudyAndMember(Study study, Member member);

    List<T> findByStudy(@Param("study") Study study);
}
