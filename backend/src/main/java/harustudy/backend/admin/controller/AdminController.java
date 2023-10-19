package harustudy.backend.admin.controller;

import harustudy.backend.admin.dto.AdminContentsResponse;
import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.dto.AdminMembersResponse;
import harustudy.backend.admin.dto.AdminParticipantsResponse;
import harustudy.backend.admin.dto.AdminStudiesResponse;
import harustudy.backend.admin.dto.AdminStudyContentResponse;
import harustudy.backend.admin.service.AdminAuthService;
import harustudy.backend.admin.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "어드민 기능")
@RequiredArgsConstructor
@RestController
public class AdminController {

    private final AdminAuthService adminAuthService;
    private final AdminService adminService;

    @Operation(summary = "어드민 로그인")
    @PostMapping(value = "/api/admin/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Void> login(AdminLoginRequest request,
            HttpServletRequest httpServletRequest) {
        UUID sessionId = adminAuthService.login(request);
        HttpSession session = httpServletRequest.getSession();
        session.setAttribute("SESSION", sessionId);
        session.setMaxInactiveInterval(3600);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "멤버 조회")
    @GetMapping("/api/admin/members")
    public ResponseEntity<AdminMembersResponse> findMembers(Pageable pageable, @RequestParam String loginType) {
        AdminMembersResponse response = adminService.findMembers(pageable, loginType);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 조회")
    @GetMapping("/api/admin/studies")
    public ResponseEntity<AdminStudiesResponse> findStudies(Pageable pageable) {
        AdminStudiesResponse response = adminService.findStudies(pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "참여자 정보 조회")
    @GetMapping("/api/admin/participants")
    public ResponseEntity<AdminParticipantsResponse> findParticipants(Pageable pageable) {
        AdminParticipantsResponse response = adminService.findParticipants(pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "콘텐츠 조회")
    @GetMapping("/api/admin/contents")
    public ResponseEntity<AdminContentsResponse> findContents(Pageable pageable) {
        AdminContentsResponse response = adminService.findContents(pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "참여코드 조회")
    @GetMapping("/api/admin/participant-codes")
    public ResponseEntity<AdminParticipantsResponse> findParticipantCodes(Pageable pageable) {
        AdminParticipantsResponse response = adminService.findParticipantCodes(pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "오늘 생성된 스터디 조회")
    @GetMapping("/api/admin/studies/created")
    public ResponseEntity<AdminStudiesResponse> findStudiesCreatedToday(Pageable pageable) {
        AdminStudiesResponse response = adminService.findStudiesCreatedToday(pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "오늘 완료된 스터디 조회")
    @GetMapping("/api/admin/studies/done")
    public ResponseEntity<AdminStudiesResponse> findStudiesDoneToday(Pageable pageable) {
        AdminStudiesResponse response = adminService.findStudiesDoneToday(pageable);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 정보 및 관련 컨텐츠 조회")
    @GetMapping("/api/admin/studies/{studyId}/contents")
    public ResponseEntity<AdminStudyContentResponse> findContentsOfStudy(Pageable pageable,
            @PathVariable Long studyId) {
        AdminStudyContentResponse response = adminService.findContentsOfStudies(pageable, studyId);
        return ResponseEntity.ok(response);
    }
}
