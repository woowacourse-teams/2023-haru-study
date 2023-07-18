package harustudy.backend.dto;

import java.util.Map;

public record MemberContentResponse(Integer cycle, Map<String, String> plan,
                                    Map<String, String> retrospect) {

}
