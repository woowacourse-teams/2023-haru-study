package harustudy.backend.room.dto;

import java.time.LocalDateTime;

public record PomodoroRoomResponseV3(Long studyId, String name, Integer totalCycle,
                                     Integer timePerCycle, LocalDateTime createdDateTime) {

}
