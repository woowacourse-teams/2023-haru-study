package harustudy.backend.content.dto;

import harustudy.backend.content.domain.Content;
import java.util.Map;

public record ContentResponse(Integer cycle, Map<String, String> plan,
                              Map<String, String> retrospect) {

    public static ContentResponse from(Content content) {
        return new ContentResponse(content.getCycle(), content.getPlan(),
                content.getRetrospect());
    }
}
