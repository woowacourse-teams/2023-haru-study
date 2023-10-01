package harustudy.backend.study.repository;

import harustudy.backend.participant.domain.Step;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyNotFoundException;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    Page<Study> findAllByCreatedDateBetween(Pageable pageable, LocalDateTime before, LocalDateTime after);

    Page<Study> findAllByLastModifiedDateBetweenAndStepIs(Pageable pageable, LocalDateTime before,
                                                          LocalDateTime after, Step step);
}
