package harustudy.backend.admin.dto;

import harustudy.backend.study.domain.Study;
import java.util.List;
import org.springframework.data.domain.Page;

public record AdminStudiesResponse(Integer totalPage, List<AdminStudyResponse> data) {

    public static AdminStudiesResponse from(Page<Study> studyPages) {
        List<AdminStudyResponse> data = studyPages.map(AdminStudyResponse::from)
                .toList();

        return new AdminStudiesResponse(studyPages.getTotalPages(), data);
    }
}
