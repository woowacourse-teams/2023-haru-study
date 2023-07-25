package harustudy.backend.room.dto;

import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.Room;

public record CreatePomodoroRoomDto(Long studyId, String participantCode) {

    public static CreatePomodoroRoomDto from(Room room, ParticipantCode participantCode) {
        return new CreatePomodoroRoomDto(room.getId(), participantCode.getCode());
    }
}
