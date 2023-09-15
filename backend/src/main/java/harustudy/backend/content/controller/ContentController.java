package harustudy.backend.content.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.content.dto.ContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.content.service.ContentService;
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
public class ContentController {

    private final ContentService contentService;

    @Operation(summary = "필터링 조건으로 멤버 컨텐츠 조회")
    @GetMapping("/api/studies/{studyId}/contents")
    public ResponseEntity<ContentsResponse> findMemberContentsWithFilter(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestParam Long participantId,
            @RequestParam(required = false) Integer cycle
    ) {
        ContentsResponse response = contentService.findContentsWithFilter(authMember, studyId, participantId, cycle);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 계획 작성")
    @PostMapping("/api/studies/{studyId}/contents/write-plan")
    public ResponseEntity<Void> writePlan(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestBody WritePlanRequest request
    ) {
        contentService.writePlan(authMember, studyId, request);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "스터디 회고 작성")
    @PostMapping("/api/studies/{studyId}/contents/write-retrospect")
    public ResponseEntity<Void> writeRetrospect(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestBody WriteRetrospectRequest request
    ) {
        contentService.writeRetrospect(authMember, studyId, request);
        return ResponseEntity.ok().build();
    }
}
