package harustudy.backend.content.repository;

import harustudy.backend.content.domain.MemberContent;
import harustudy.backend.progress.domain.MemberProgress;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContentRepository<T extends MemberContent> extends JpaRepository<T, Long> {

    List<T> findByMemberProgress(MemberProgress memberProgress);
}
