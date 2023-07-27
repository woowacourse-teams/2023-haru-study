package harustudy.backend.participantcode.dto;

import jakarta.validation.constraints.NotNull;

public record FindRoomRequest(@NotNull String participantCode) {

}
