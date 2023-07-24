package harustudy.backend.record.repository;

import harustudy.backend.progress.domain.MemberProgress;
import harustudy.backend.record.domain.MemberRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRecordRepository<T extends MemberRecord> extends JpaRepository<T, Long> {

    List<T> findByMemberProgress(MemberProgress memberProgress);
}
