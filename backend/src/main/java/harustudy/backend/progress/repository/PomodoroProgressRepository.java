package harustudy.backend.progress.repository;

import harustudy.backend.member.domain.Member;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.study.domain.PomodoroStudy;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PomodoroProgressRepository extends JpaRepository<PomodoroProgress, Long> {

    Optional<PomodoroProgress> findByPomodoroStudyAndMember(PomodoroStudy pomodoroStudy,
            Member member);

    @Query("select p from PomodoroProgress p join fetch p.member where p.pomodoroStudy = :pomodoroStudy")
    List<PomodoroProgress> findAllByPomodoroStudyFetchMember(
            @Param("pomodoroStudy") PomodoroStudy pomodoroStudy);


    List<PomodoroProgress> findByMember(Member member);

    List<PomodoroProgress> findByPomodoroStudy(PomodoroStudy pomodoroStudy);

    default PomodoroProgress findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(PomodoroProgressNotFoundException::new);
    }
}
