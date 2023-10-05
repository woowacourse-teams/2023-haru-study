package harustudy.backend.admin.dto;

import harustudy.backend.content.domain.Content;
import harustudy.backend.study.domain.Study;

import java.util.List;

public record AdminStudyContentResponse(Long studyId, String studyName, List<AdminContentResponse> contents) {

    public static AdminStudyContentResponse of(Study study, List<Content> contents) {
        List<AdminContentResponse> contentResponses = contents.stream()
                .map(AdminContentResponse::from)
                .toList();

        return new AdminStudyContentResponse(study.getId(), study.getName(), contentResponses);
    }
}
