package harustudy.backend.progress.repository;

import harustudy.backend.member.domain.Member;

import java.util.List;
import java.util.Optional;

import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.domain.PomodoroRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroProgressRepository extends JpaRepository<PomodoroProgress, Long> {

    Optional<PomodoroProgress> findByPomodoroRoomAndMember(PomodoroRoom pomodoroRoom, Member member);

    List<PomodoroProgress> findByPomodoroRoom(PomodoroRoom pomodoroRoom);
}
