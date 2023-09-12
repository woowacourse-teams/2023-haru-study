package harustudy.backend.study.repository;

import harustudy.backend.study.domain.PomodoroStudy;
import harustudy.backend.study.exception.StudyNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroStudyRepository extends JpaRepository<PomodoroStudy, Long> {
  
    default PomodoroStudy findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(StudyNotFoundException::new);
    }
}
