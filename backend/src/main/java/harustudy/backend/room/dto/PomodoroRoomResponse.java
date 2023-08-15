package harustudy.backend.room.dto;

import java.time.LocalDateTime;

public record PomodoroRoomResponse(Long studyId, String name, Integer totalCycle,
                                   Integer timePerCycle, LocalDateTime createdDateTime) {

}
