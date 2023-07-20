package harustudy.backend.repository;

import harustudy.backend.entity.MemberProgress;
import harustudy.backend.entity.MemberRecord;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRecordRepository<T extends MemberRecord> extends JpaRepository<T, Long> {

    List<T> findByMemberProgress(MemberProgress memberProgress);
}
