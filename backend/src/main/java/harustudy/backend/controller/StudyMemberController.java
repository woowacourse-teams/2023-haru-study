package harustudy.backend.controller;

import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberContentResponses;
import harustudy.backend.dto.response.StudyMemberMetaDataResponse;
import harustudy.backend.service.PomodoroProgressService;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class StudyMemberController {

    private final PomodoroProgressService pomodoroProgressService;

    @GetMapping("/api/studies/{studyId}/members/{memberId}/metadata")
    public ResponseEntity<StudyMemberMetaDataResponse> findMemberStudyMetaData(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(
                pomodoroProgressService.findMemberMetaData(studyId, memberId));
    }

    @GetMapping("/api/studies/{studyId}/members/{memberId}/content")
    public ResponseEntity<MemberContentResponses> findMemberContent(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(
                pomodoroProgressService.findMemberContent(studyId, memberId));
    }

    @GetMapping("/api/studies/{studyId}/members/{memberId}/content/plans")
    public ResponseEntity<CurrentCyclePlanResponse> findCurrentCyclePlan(
            @PathVariable Long studyId,
            @PathVariable Long memberId,
            @RequestParam @NotNull Integer cycle
    ) {
        return ResponseEntity.ok(
                pomodoroProgressService.findCurrentCyclePlan(studyId, memberId, cycle));
    }
}
