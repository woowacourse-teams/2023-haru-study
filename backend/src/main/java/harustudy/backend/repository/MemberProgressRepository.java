package harustudy.backend.repository;

import harustudy.backend.entity.MemberProgress;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberProgressRepository<T extends MemberProgress> extends JpaRepository<T, Long> {

    @Query("select mp from MemberProgress mp where type(mp) = (PomodoroProgress) and mp.member.id = :memberId and mp.study.id = :studyId")
    Optional<T> findByMemberIdWithStudyId(@Param("memberId") Long memberId,
            @Param("studyId") Long studyId);
}
