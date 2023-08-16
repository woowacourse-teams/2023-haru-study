package harustudy.backend.progress.repository;

import harustudy.backend.member.domain.Member;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.room.domain.PomodoroRoom;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PomodoroProgressRepository extends JpaRepository<PomodoroProgress, Long> {

    Optional<PomodoroProgress> findByPomodoroRoomAndMember(PomodoroRoom pomodoroRoom,
            Member member);

    @Query("select p from PomodoroProgress p join fetch p.member where p.pomodoroRoom = :pomodoroRoom")
    List<PomodoroProgress> findAllByPomodoroRoomFetchMember(
            @Param("pomodoroRoom") PomodoroRoom pomodoroRoom);


    List<PomodoroProgress> findByMember(Member member);

    List<PomodoroProgress> findByPomodoroRoom(PomodoroRoom pomodoroRoom);

    default PomodoroProgress findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(PomodoroProgressNotFoundException::new);
    }
}
