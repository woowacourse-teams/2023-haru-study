package harustudy.backend.controller;

import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.service.MemberProgressService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class StudyController {

    private final MemberProgressService memberProgressService;

    @GetMapping("/api/stuides/{studyId}/content/plans")
    public ResponseEntity<CurrentCyclePlanResponse> findCurrentCyclePlan(
            @PathVariable Long studyId,
            @RequestParam Integer cycle,
            @RequestParam Long memberId) {
        return ResponseEntity.ok(
                memberProgressService.findByStudyIdWithMemberIdWithCycle(cycle, studyId, memberId));
    }
}
