package harustudy.backend.content.controller;

import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequestV3;
import harustudy.backend.content.dto.WriteRetrospectRequestV3;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "컨텐츠 관련 기능")
@RequiredArgsConstructor
@RestController
public class PomodoroContentControllerV3 {

    @Operation(summary = "사이클 횟수에 해당하는 멤버 컨텐츠 조회")
    @GetMapping("/api/v3/studies/{studyId}/contents")
    public ResponseEntity<PomodoroContentsResponse> findMemberContent(
            @PathVariable("studyId") Long studyId,
            @RequestParam("progressId") Long progressId,
            @RequestParam(value = "cycle", required = false) Integer cycle
    ) {
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "스터디 계획 작성")
    @PostMapping("/api/v3/studies/{studyId}/contents/write-plan")
    public ResponseEntity<Void> writePlan(
            @PathVariable("studyId") Long studyId,
            @RequestBody WritePlanRequestV3 request
    ) {
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "스터디 회고 작성")
    @PostMapping("/api/v3/studies/{studyId}/contents/write-retrospect")
    public ResponseEntity<Void> writeRetrospect(
            @PathVariable("studyId") Long studyId,
            @RequestBody WriteRetrospectRequestV3 request
    ) {
        return ResponseEntity.ok().build();
    }
}