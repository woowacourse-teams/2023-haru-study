package harustudy.backend.content.controller;

import harustudy.backend.content.dto.PomodoroContentResponses;
import harustudy.backend.content.service.PomodoroContentService;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// TODO: 콘텐츠 길이 검증 필요
@RequiredArgsConstructor
@RestController
public class PomodoroContentController {

    private final PomodoroContentService pomodoroContentService;

    @PostMapping("/api/studies/{studyId}/members/{memberId}/content/plans")
    public ResponseEntity<Void> writePlan(
            @PathVariable("studyId") Long studyId,
            @PathVariable("memberId") Long memberId,
            @RequestBody Map<String, String> plan
    ) {
        pomodoroContentService.writePlan(studyId, memberId, plan);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/api/studies/{studyId}/members/{memberId}/content/retrospects")
    public ResponseEntity<Void> writeRetrospect(
            @PathVariable("studyId") Long studyId,
            @PathVariable("memberId") Long memberId,
            @RequestBody Map<String, String> retrospect
    ) {
        pomodoroContentService.writeRetrospect(studyId, memberId, retrospect);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/api/studies/{studyId}/members/{memberId}/content/plans")
    public ResponseEntity<Map<String, String>> findCurrentCyclePlan(
            @PathVariable Long studyId,
            @PathVariable Long memberId,
            @RequestParam @NotNull Integer cycle
    ) {
        return ResponseEntity.ok(pomodoroContentService.findCurrentCyclePlan(studyId, memberId, cycle));
    }

    @GetMapping("/api/studies/{studyId}/members/{memberId}/content")
    public ResponseEntity<PomodoroContentResponses> findMemberContent(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(pomodoroContentService.findMemberContent(studyId, memberId));
    }
}