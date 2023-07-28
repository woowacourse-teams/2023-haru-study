package harustudy.backend.room.dto;

import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;

public record CreatePomodoroRoomDto(Long studyId, String participantCode) {

    public static CreatePomodoroRoomDto from(PomodoroRoom pomodoroRoom, ParticipantCode participantCode) {
        return new CreatePomodoroRoomDto(pomodoroRoom.getId(), participantCode.getCode());
    }
}
