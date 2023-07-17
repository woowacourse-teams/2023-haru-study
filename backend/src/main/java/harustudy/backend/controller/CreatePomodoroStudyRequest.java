package harustudy.backend.controller;

public record CreatePomodoroStudyRequest(String name, Integer totalCycle, Integer timePerCycle) {

    public CreatePomodoroStudyRequest {
    }
}
