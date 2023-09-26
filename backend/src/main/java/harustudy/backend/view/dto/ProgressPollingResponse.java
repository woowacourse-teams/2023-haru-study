package harustudy.backend.view.dto;

import harustudy.backend.participant.domain.Step;

public record ProgressPollingResponse(String progressStep) {

    public static ProgressPollingResponse from(Step progressStep) {
        return new ProgressPollingResponse(progressStep.name().toLowerCase());
    }
}
