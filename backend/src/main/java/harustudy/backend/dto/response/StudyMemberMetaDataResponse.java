package harustudy.backend.dto.response;

import harustudy.backend.entity.StudyStatus;

public record StudyMemberMetaDataResponse(String studyName, Integer totalCycle,
                                          Integer currentCycle,
                                          Integer timePerCycle, String step) {

    public StudyMemberMetaDataResponse(String studyName, Integer totalCycle, Integer currentCycle,
            Integer timePerCycle, StudyStatus step) {
        this(studyName, totalCycle, currentCycle, timePerCycle, step.name());
    }
}
