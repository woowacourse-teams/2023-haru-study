package harustudy.backend.room.dto;

import harustudy.backend.room.domain.PomodoroRoom;
import java.util.List;

public record PomodoroRoomsResponse(List<PomodoroRoomResponse> studies) {

    public static PomodoroRoomsResponse from(List<PomodoroRoom> pomodoroRooms) {
        return new PomodoroRoomsResponse(pomodoroRooms.stream()
                .map(PomodoroRoomResponse::from)
                .toList());
    }
}
