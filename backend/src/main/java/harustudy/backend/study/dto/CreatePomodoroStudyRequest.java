package harustudy.backend.study.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreatePomodoroStudyRequest(
        @NotBlank String name,
        @NotNull Integer totalCycle,
        @NotNull Integer timePerCycle
) {

}
