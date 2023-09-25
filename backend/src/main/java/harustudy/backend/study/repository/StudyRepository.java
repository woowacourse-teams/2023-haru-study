package harustudy.backend.study.repository;

import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Long> {
  
    default Study findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(StudyNotFoundException::new);
    }
}
