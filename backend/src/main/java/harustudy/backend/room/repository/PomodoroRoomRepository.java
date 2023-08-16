package harustudy.backend.room.repository;

import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import java.util.List;
import harustudy.backend.room.exception.RoomNotFoundException;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroRoomRepository extends JpaRepository<PomodoroRoom, Long> {
    
    // TODO: Optional로 변경
    List<PomodoroRoom> findByParticipantCode(ParticipantCode participantCode);
  
    default PomodoroRoom findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(RoomNotFoundException::new);
    }
}
