package harustudy.backend.progress.dto;

public record PomodoroProgressResponseV3(Long progressId, String nickname, Integer currentCycle,
                                         String step) {

}
