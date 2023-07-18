package harustudy.backend.controller;

import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberStudyMetaDataResponse;
import harustudy.backend.service.PomodoroProgressService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class StudyController {

    private final PomodoroProgressService pomodoroProgressService;

    @GetMapping("/api/stuides/{studyId}/content/plans")
    public ResponseEntity<CurrentCyclePlanResponse> findCurrentCyclePlan(
            @PathVariable Long studyId,
            @RequestParam Integer cycle,
            @RequestParam Long memberId) {
        return ResponseEntity.ok(
                pomodoroProgressService.findCurrentCyclePlanByStudyIdAndMemberIdAndCycle(cycle,
                        studyId, memberId));
    }

    @GetMapping("/api/studies/{studyId}/members/{memberId}/metadata")
    public ResponseEntity<MemberStudyMetaDataResponse> findMemberStudyMetaData(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(
                pomodoroProgressService.findMemberMetaDataByStudyIdAndMemberId(studyId, memberId));
    }
}
