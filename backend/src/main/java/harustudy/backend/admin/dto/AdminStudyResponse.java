package harustudy.backend.admin.dto;

import harustudy.backend.study.domain.Study;
import java.time.LocalDateTime;

public record AdminStudyResponse(Long id, String name, Integer totalCycle, Integer timePerCycle, Integer currentCycle,
                                 String step, LocalDateTime createdDate, LocalDateTime lastModifiedDate) {

    public static AdminStudyResponse from(Study study) {
        return new AdminStudyResponse(study.getId(), study.getName(), study.getTotalCycle(), study.getTimePerCycle(),
                study.getCurrentCycle(), study.getStep().name(), study.getCreatedDate(), study.getLastModifiedDate());
    }
}
