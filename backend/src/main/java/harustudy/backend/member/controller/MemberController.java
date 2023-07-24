package harustudy.backend.member.controller;

import harustudy.backend.member.dto.StudyMemberMetaDataResponse;
import harustudy.backend.progress.service.PomodoroProgressService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class MemberController {

    private final PomodoroProgressService pomodoroProgressService;

    // TODO: API 분리. 도메인 영역이 너무 모호함
    @GetMapping("/api/studies/{studyId}/members/{memberId}/metadata")
    public ResponseEntity<StudyMemberMetaDataResponse> findMemberStudyMetaData(
            @PathVariable Long studyId,
            @PathVariable Long memberId
    ) {
        return ResponseEntity.ok(
                pomodoroProgressService.findMemberMetaData(studyId, memberId));
    }
}
