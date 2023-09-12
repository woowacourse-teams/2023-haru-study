package harustudy.backend.study.dto;

import harustudy.backend.study.domain.PomodoroStudy;
import java.util.List;

public record PomodoroStudiesResponse(List<PomodoroStudyResponse> studies) {

    public static PomodoroStudiesResponse from(List<PomodoroStudy> pomodoroStudies) {
        return new PomodoroStudiesResponse(pomodoroStudies.stream()
                .map(PomodoroStudyResponse::from)
                .toList());
    }
}
