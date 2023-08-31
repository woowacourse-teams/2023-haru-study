package harustudy.backend.room.repository;

import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.exception.RoomNotFoundException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroRoomRepository extends JpaRepository<PomodoroRoom, Long> {
  
    default PomodoroRoom findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(RoomNotFoundException::new);
    }
}
