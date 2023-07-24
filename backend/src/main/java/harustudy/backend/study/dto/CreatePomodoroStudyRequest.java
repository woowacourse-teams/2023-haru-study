package harustudy.backend.study.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;

public record CreatePomodoroStudyRequest(
        @Size(min = 1, max = 10) String name,
        @Min(1) @Max(8) Integer totalCycle,
        @Min(20) @Max(40) Integer timePerCycle) {

    public CreatePomodoroStudyRequest {
    }
}
