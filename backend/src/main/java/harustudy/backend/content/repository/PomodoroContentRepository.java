package harustudy.backend.content.repository;

import java.util.List;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.progress.domain.PomodoroProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroContentRepository extends JpaRepository<PomodoroContent, Long> {

    List<PomodoroContent> findByPomodoroProgress(PomodoroProgress pomodoroProgress);
}
