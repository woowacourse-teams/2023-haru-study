package harustudy.backend.room.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;

public record CreatePomodoroRoomResponse(@JsonIgnore Long studyId, String participantCode) {

    public static CreatePomodoroRoomResponse from(PomodoroRoom savedRoom,
            ParticipantCode participantCode) {
        return new CreatePomodoroRoomResponse(savedRoom.getId(), participantCode.getCode());
    }
}
