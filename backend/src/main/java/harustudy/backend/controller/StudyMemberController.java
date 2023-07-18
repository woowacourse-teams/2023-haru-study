package harustudy.backend.controller;

import harustudy.backend.dto.response.MemberContentResponses;
import harustudy.backend.dto.response.MemberStudyMetaDataResponse;
import harustudy.backend.service.PomodoroProgressService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@AllArgsConstructor
@RestController
public class StudyMemberController {

    private final PomodoroProgressService pomodoroProgressService;

    @GetMapping("/api/studies/{studyId}/members/{memberId}/metadata")
    public ResponseEntity<MemberStudyMetaDataResponse> findMemberStudyMetaData(
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

}
