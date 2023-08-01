package harustudy.backend.room.service;

import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.PomodoroRoomResponseV2;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroRoomServiceV2 {

    private final PomodoroRoomRepository pomodoroRoomRepository;

    public PomodoroRoomResponseV2 findPomodoroRoom(Long studyId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(studyId)
                .orElseThrow(RoomNotFound::new);
        return PomodoroRoomResponseV2.from(pomodoroRoom);
    }
}
