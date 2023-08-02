package harustudy.backend.room.dto;

import harustudy.backend.room.domain.PomodoroRoom;

public record PomodoroRoomResponseV2(Long studyId, String name, Integer totalCycle, Integer timePerCycle) {

    public static PomodoroRoomResponseV2 from(PomodoroRoom pomodoroRoom) {
        return new PomodoroRoomResponseV2(pomodoroRoom.getId(), pomodoroRoom.getName(),
                pomodoroRoom.getTotalCycle(), pomodoroRoom.getTimePerCycle());
    }
}
