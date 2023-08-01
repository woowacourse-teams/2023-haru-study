package harustudy.backend.room.controller;

import harustudy.backend.room.dto.PomodoroRoomResponseV2;
import harustudy.backend.room.service.PomodoroRoomServiceV2;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class PomodoroRoomControllerV2 {

    private final PomodoroRoomServiceV2 pomodoroRoomServiceV2;

    @GetMapping("/api/studies/{studyId}")
    public ResponseEntity<PomodoroRoomResponseV2> findStudy(@PathVariable Long studyId) {
        return ResponseEntity.ok(pomodoroRoomServiceV2.findPomodoroRoom(studyId));
    }
}
