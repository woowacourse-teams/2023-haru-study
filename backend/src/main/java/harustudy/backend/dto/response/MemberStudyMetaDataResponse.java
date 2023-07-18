package harustudy.backend.dto.response;

import com.fasterxml.jackson.annotation.JsonCreator;
import harustudy.backend.entity.StudyStatus;

public record MemberStudyMetaDataResponse(String studyName, Integer totalCycle,
                                          Integer currentCycle,
                                          Integer timePerCycle, String step) {

    @JsonCreator
    public MemberStudyMetaDataResponse(String studyName, Integer totalCycle, Integer currentCycle,
            Integer timePerCycle, StudyStatus step) {
        this(studyName, totalCycle, currentCycle, timePerCycle, step.name());
    }
}
