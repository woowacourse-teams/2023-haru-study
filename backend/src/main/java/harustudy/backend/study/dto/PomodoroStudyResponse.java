package harustudy.backend.study.dto;

import harustudy.backend.study.domain.PomodoroStudy;
import java.time.LocalDateTime;

public record PomodoroStudyResponse(Long studyId, String name, Integer totalCycle,
                                    Integer timePerCycle, LocalDateTime createdDateTime) {

    public static PomodoroStudyResponse from(PomodoroStudy pomodoroStudy) {
        return new PomodoroStudyResponse(pomodoroStudy.getId(), pomodoroStudy.getName(),
                pomodoroStudy.getTotalCycle(), pomodoroStudy.getTimePerCycle(),
                pomodoroStudy.getCreatedDate());
    }
}
