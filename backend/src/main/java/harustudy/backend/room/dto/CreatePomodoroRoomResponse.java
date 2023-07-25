package harustudy.backend.room.dto;

public record CreatePomodoroRoomResponse(String participantCode) {

    public static CreatePomodoroRoomResponse of(CreatePomodoroRoomDto createPomodoroRoomDto) {
        return new CreatePomodoroRoomResponse(createPomodoroRoomDto.participantCode());
    }
}
