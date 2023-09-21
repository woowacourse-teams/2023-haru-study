package harustudy.backend.room.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePomodoroRoomRequest(
        @NotBlank String name,
        @NotNull Integer totalCycle,
        @NotNull Integer timePerCycle
) {

}
