package harustudy.backend.room.dto;

import harustudy.backend.room.domain.PomodoroRoom;
import java.time.LocalDateTime;

public record PomodoroRoomResponse(Long studyId, String name, Integer totalCycle,
                                   Integer timePerCycle, LocalDateTime createdDateTime) {

    public static PomodoroRoomResponse from(PomodoroRoom pomodoroRoom) {
        return new PomodoroRoomResponse(pomodoroRoom.getId(), pomodoroRoom.getName(),
                pomodoroRoom.getTotalCycle(), pomodoroRoom.getTimePerCycle(),
                pomodoroRoom.getCreatedDate());
    }
}
