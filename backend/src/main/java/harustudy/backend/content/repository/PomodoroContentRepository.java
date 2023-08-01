package harustudy.backend.content.repository;

import harustudy.backend.content.controller.domain.PomodoroContent;
import harustudy.backend.progress.domain.PomodoroProgress;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroContentRepository extends JpaRepository<PomodoroContent, Long> {

    List<PomodoroContent> findByPomodoroProgress(PomodoroProgress pomodoroProgress);
}
