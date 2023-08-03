package harustudy.backend.room.dto;

import jakarta.validation.constraints.NotNull;

@Deprecated
public record ParticipateRequest(@NotNull String nickname) {

}
