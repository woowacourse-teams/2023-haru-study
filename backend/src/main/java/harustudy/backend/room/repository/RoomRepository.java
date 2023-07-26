package harustudy.backend.room.repository;

import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {

    Room findByParticipantCode(ParticipantCode participantCode);
}
