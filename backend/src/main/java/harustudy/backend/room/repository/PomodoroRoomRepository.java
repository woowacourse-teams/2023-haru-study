package harustudy.backend.room.repository;

import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroRoomRepository extends JpaRepository<PomodoroRoom, Long> {

    List<PomodoroRoom> findByParticipantCode(ParticipantCode participantCode);
}
