package harustudy.backend.view.dto;

import harustudy.backend.participant.domain.Step;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.study.domain.Study;

import java.util.List;

import static harustudy.backend.study.dto.StudyResponse.IN_PROGRESS;

public record WaitingResponse(String studyStep, List<ParticipantResponse> participants) {

    public static WaitingResponse of(Study study, List<ParticipantResponse> participants) {
        return new WaitingResponse(getRoomStep(study), participants);
    }

    private static String getRoomStep(Study study) {
        String roomStep;
        if (study.isStep(Step.PLANNING) || study.isStep(Step.STUDYING) || study.isStep(Step.RETROSPECT)) {
            roomStep = IN_PROGRESS;
        } else {
            roomStep = study.getStep().name().toLowerCase();
        }
        return roomStep;
    }
}
