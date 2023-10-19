package harustudy.backend.admin.dto;

import harustudy.backend.content.domain.Content;
import java.util.List;
import org.springframework.data.domain.Page;

public record AdminContentsResponse(Integer totalPage, List<AdminContentResponse> data) {

    public static AdminContentsResponse from(Page<Content> contentPages) {
        List<AdminContentResponse> data = contentPages.map(AdminContentResponse::from)
                .toList();

        return new AdminContentsResponse(contentPages.getTotalPages(), data);
    }
}
