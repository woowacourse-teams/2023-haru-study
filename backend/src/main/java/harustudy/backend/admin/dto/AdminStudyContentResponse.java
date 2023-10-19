package harustudy.backend.admin.dto;

import harustudy.backend.content.domain.Content;
import harustudy.backend.study.domain.Study;
import java.util.List;
import org.springframework.data.domain.Page;

public record AdminStudyContentResponse(Long studyId, String studyName, Integer totalPage,
                                        List<AdminContentResponse> contents) {

    public static AdminStudyContentResponse of(Study study, Page<Content> contents) {
        List<AdminContentResponse> contentResponses = contents.stream()
                .map(AdminContentResponse::from)
                .toList();

        return new AdminStudyContentResponse(study.getId(), study.getName(),
                contents.getTotalPages(), contentResponses);
    }
}
