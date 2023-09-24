package harustudy.backend.study.dto;

import harustudy.backend.participant.domain.Step;
import harustudy.backend.study.domain.Study;

import java.time.LocalDateTime;

public record StudyResponse(Long studyId, String name, Integer totalCycle, Integer timePerCycle, Integer currentCycle,
                            String roomStep, String progressStep, LocalDateTime createdDateTime) {

    public static final String IN_PROGRESS = "inProgress";

    public static StudyResponse from(Study study) {
        String roomStep = getRoomStep(study);
        String progressStep = getProgressStep(study);

        return new StudyResponse(study.getId(), study.getName(), study.getTotalCycle(), study.getTimePerCycle(),
                study.getCurrentCycle(), roomStep, progressStep, study.getCreatedDate());
    }

    private static String getRoomStep(Study study) {
        String roomStep;
        if (study.isStep(Step.PLANNING) ||  study.isStep(Step.STUDYING) || study.isStep(Step.RETROSPECT)) {
            roomStep = IN_PROGRESS;
        } else {
            roomStep = study.getStep().name().toLowerCase();
        }
        return roomStep;
    }

    private static String getProgressStep(Study study) {
        String progressStep;
        if (study.isStep(Step.WAITING)) {
            progressStep = Step.PLANNING.name().toLowerCase();
        } else if (study.isStep(Step.DONE)) {
            progressStep = Step.RETROSPECT.name().toLowerCase();
        } else {
            progressStep = study.getStep().name().toLowerCase();
        }
        return progressStep;
    }
}
