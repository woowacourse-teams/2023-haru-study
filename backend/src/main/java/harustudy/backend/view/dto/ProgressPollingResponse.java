package harustudy.backend.view.dto;

public record ProgressPollingResponse(String progressStep) {

    public static ProgressPollingResponse from(String progressStep) {
        return new ProgressPollingResponse(progressStep.toLowerCase());
    }
}
