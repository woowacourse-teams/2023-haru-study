package harustudy.backend.room.dto.content;

import harustudy.backend.room.domain.content.PomodoroContent;

import java.util.Map;

public record MemberContentResponse(Integer cycle, Map<String, String> plan,
                                    Map<String, String> retrospect) {
    public static MemberContentResponse from(PomodoroContent pomodoroContent) {
        return new MemberContentResponse(pomodoroContent.getCycle(), pomodoroContent.getPlan(),
                pomodoroContent.getRetrospect());
    }
}
