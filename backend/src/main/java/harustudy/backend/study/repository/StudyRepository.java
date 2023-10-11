package harustudy.backend.study.repository;

import harustudy.backend.participant.domain.Step;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyNotFoundException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StudyRepository extends JpaRepository<Study, Long> {

    default Study findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(StudyNotFoundException::new);
    }

    @Query("select s.step from Study s where s.id = :id")
    Optional<Step> findStepById(@Param("id") Long id);

    @Query("select s from Study s join s.participants p where p.member.id = :memberId and s.createdDate between :startDate and :endDate")
    List<Study> findByMemberIdAndCreatedDateSortedBy(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Sort sort
    );

    @Query("select s from Study s join s.participants p where p.member.id = :memberId and s.createdDate between :startDate and :endDate")
    Page<Study> findPageByMemberIdAndCreatedDate(
            @Param("memberId") Long memberId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            Pageable pageable
    );

    @Query("select s from Study s join s.participants p where p.member.id = :memberId")
    List<Study> findByMemberId(Long memberId);
}
