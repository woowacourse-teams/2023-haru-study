package harustudy.backend.room.repository;

import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PomodoroRoomRepository extends JpaRepository<PomodoroRoom, Long> {

    Optional<PomodoroRoom> findByParticipantCode(ParticipantCode participantCode);
}
