package harustudy.backend.room.repository;

import harustudy.backend.room.domain.PomodoroRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroRoomRepository extends JpaRepository<PomodoroRoom, Long>,
        PomodoroRoomRepositoryCustom {

}
