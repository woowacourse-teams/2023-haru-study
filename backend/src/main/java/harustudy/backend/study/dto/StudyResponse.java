package harustudy.backend.study.dto;

import harustudy.backend.study.domain.Study;
import java.time.LocalDateTime;

public record StudyResponse(Long studyId, String name, Integer totalCycle,
                            Integer timePerCycle, LocalDateTime createdDateTime) {

    public static StudyResponse from(Study study) {
        return new StudyResponse(study.getId(), study.getName(),
                study.getTotalCycle(), study.getTimePerCycle(),
                study.getCreatedDate());
    }
}
