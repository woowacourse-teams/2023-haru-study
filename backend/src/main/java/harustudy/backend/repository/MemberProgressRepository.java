package harustudy.backend.repository;

import harustudy.backend.entity.MemberProgress;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberProgressRepository<T extends MemberProgress> extends JpaRepository<T, Long> {

    @Query("""
                select mp from MemberProgress mp
                join fetch mp.study
                where type(mp) = (PomodoroProgress)
                and mp.member.id = :memberId
                and mp.study.id = :studyId
            """)
    Optional<T> findByStudyIdAndMemberId(@Param("studyId") Long studyId,
            @Param("memberId") Long memberId);

    @Query("""
                select mp from MemberProgress mp
                join fetch mp.study
                join fetch mp.member
                where type(mp) = (PomodoroProgress)
                and mp.study.id = :studyId
            """)
    List<T> findByStudyId(@Param("studyId") Long studyId);
}
