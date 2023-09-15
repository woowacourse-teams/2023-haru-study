package harustudy.backend.content.dto;

import java.util.List;

public record ContentsResponse(List<ContentResponse> content) {

    public static ContentsResponse from(List<ContentResponse> content) {
        return new ContentsResponse(content);
    }
}
