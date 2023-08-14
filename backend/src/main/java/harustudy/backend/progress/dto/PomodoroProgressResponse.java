package harustudy.backend.progress.dto;

public record PomodoroProgressResponse(Long progressId, String nickname, Integer currentCycle,
                                       String step) {

}
