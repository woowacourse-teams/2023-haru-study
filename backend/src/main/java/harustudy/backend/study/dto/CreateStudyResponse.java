package harustudy.backend.study.dto;

import harustudy.backend.study.domain.Study;

public record CreateStudyResponse(Long studyId) {

    public static CreateStudyResponse from(Study savedStudy) {
        return new CreateStudyResponse(savedStudy.getId());
    }
}
