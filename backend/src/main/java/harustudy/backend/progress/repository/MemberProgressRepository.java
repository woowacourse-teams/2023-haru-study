package harustudy.backend.progress.repository;

import harustudy.backend.member.domain.Member;
import harustudy.backend.progress.domain.MemberProgress;
import harustudy.backend.room.domain.Room;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberProgressRepository<T extends MemberProgress> extends JpaRepository<T, Long> {

    Optional<T> findByRoomAndMember(Room room, Member member);

    List<T> findByRoom(Room room);
}
