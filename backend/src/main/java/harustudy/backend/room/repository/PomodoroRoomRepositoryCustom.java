package harustudy.backend.room.repository;

import harustudy.backend.room.domain.PomodoroRoom;
import java.util.Optional;

public interface PomodoroRoomRepositoryCustom {

    Optional<PomodoroRoom> findWithFilter(Long roomId, String participantCode);
}
