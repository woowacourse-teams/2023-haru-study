package harustudy.backend.study.dto;

import harustudy.backend.study.domain.Study;
import java.util.List;

public record StudiesResponse(List<StudyResponse> studies) {

    public static StudiesResponse from(List<Study> studies) {
        return new StudiesResponse(studies.stream()
                .map(StudyResponse::from)
                .toList());
    }
}
