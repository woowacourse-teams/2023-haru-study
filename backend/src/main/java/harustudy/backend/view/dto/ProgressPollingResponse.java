package harustudy.backend.view.dto;

import harustudy.backend.study.domain.Study;

public record ProgressPollingResponse(String progressStep) {

    public static ProgressPollingResponse from(Study study) {
        return new ProgressPollingResponse(study.getStep().name().toLowerCase());
    }
}
