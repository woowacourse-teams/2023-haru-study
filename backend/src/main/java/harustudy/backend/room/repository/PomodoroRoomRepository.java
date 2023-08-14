package harustudy.backend.room.repository;

import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PomodoroRoomRepository extends JpaRepository<PomodoroRoom, Long> {

    Optional<PomodoroRoom> findByParticipantCode(ParticipantCode participantCode);
}
