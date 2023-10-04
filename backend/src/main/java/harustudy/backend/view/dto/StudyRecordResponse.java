package harustudy.backend.view.dto;

import harustudy.backend.study.domain.Study;
import java.time.LocalDateTime;

public record StudyRecordResponse(Long studyId, String name, Integer totalCycle, Integer timePerCycle, LocalDateTime createdDate) {

    public static StudyRecordResponse from(Study study) {
        return new StudyRecordResponse(
                study.getId(),
                study.getName(),
                study.getTotalCycle(),
                study.getTimePerCycle(),
                study.getCreatedDate()
        );
    }
}
