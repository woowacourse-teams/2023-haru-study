package harustudy.backend.room.dto;

import jakarta.validation.constraints.NotNull;

public record ReParticipateRequest(@NotNull String nickname, @NotNull Long memberId) {

}
