package harustudy.backend.record.controller;

import harustudy.backend.progress.service.PomodoroProgressService;
import harustudy.backend.record.dto.CurrentCyclePlanResponse;
import harustudy.backend.record.dto.MemberContentResponses;
import harustudy.backend.record.service.ProceedPomodoroStudyService;
import jakarta.validation.constraints.NotNull;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// TODO: 콘텐츠 길이 검증 필요
@RequiredArgsConstructor
@RestController
public class ContentController {

    private final ProceedPomodoroStudyService proceedPomodoroStudyService;
    private final PomodoroProgressService pomodoroProgressService;

    @PostMapping("/api/studies/{studyId}/members/{memberId}/content/plans")
    public ResponseEntity<Void> writePlan(
            @PathVariable("studyId") Long studyId,
            @PathVariable("memberId") Long memberId,
            @RequestBody Map<String, String> plan
    ) {
        proceedPomodoroStudyService.writePlan(studyId, memberId, plan);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/api/studies/{studyId}/members/{memberId}/content/retrospects")
    public ResponseEntity<Void> writeRetrospect(
            @PathVariable("studyId") Long studyId,
            @PathVariable("memberId") Long memberId,
            @RequestBody Map<String, String> retrospect
    ) {
        proceedPomodoroStudyService.writeRetrospect(studyId, memberId, retrospect);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    // TODO: 아래 메소드와 겹치는 부분 리팩토링
    @GetMapping("/api/studies/{studyId}/members/{memberId}/content/plans")
    public ResponseEntity<CurrentCyclePlanResponse> findCurrentCyclePlan(
            @PathVariable Long studyId,
            @PathVariable Long memberId,
            @RequestParam @NotNull Integer cycle
    ) {
        return ResponseEntity.ok(
                pomodoroProgressService.findCurrentCyclePlan(studyId, memberId, cycle));
    }

    @GetMapping("/api/studies/{studyId}/members/{memberId}/content")
    public ResponseEntity<MemberContentResponses> findMemberContent(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(
                proceedPomodoroStudyService.findMemberContent(studyId, memberId));
    }
}
