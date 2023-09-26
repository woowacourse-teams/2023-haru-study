package harustudy.backend.view.dto;

import harustudy.backend.participant.domain.Step;

public record ProgressResponse(String progressStep) {

    public static ProgressResponse from(Step progressStep) {
        return new ProgressResponse(progressStep.name().toLowerCase());
    }
}
