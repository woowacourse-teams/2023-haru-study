package harustudy.backend.repository;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.MemberProgress;
import harustudy.backend.entity.Study;
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
                and mp.study = :study
                and mp.member = :member
            """)
    Optional<T> findByStudyIdAndMemberId(@Param("study") Study study,
            @Param("member") Member member);

    @Query("""
                select mp from MemberProgress mp
                join fetch mp.study
                join fetch mp.member
                where type(mp) = (PomodoroProgress)
                and mp.study = :study
            """)
    List<T> findByStudyId(@Param("study") Study study);
}
