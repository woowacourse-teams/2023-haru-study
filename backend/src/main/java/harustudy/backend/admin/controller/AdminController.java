package harustudy.backend.admin.controller;

import harustudy.backend.admin.dto.AdminContentResponse;
import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.dto.AdminMembersResponse;
import harustudy.backend.admin.dto.AdminParticipantCodeResponse;
import harustudy.backend.admin.dto.AdminParticipantResponse;
import harustudy.backend.admin.dto.AdminStudyContentResponse;
import harustudy.backend.admin.dto.AdminStudyResponse;
import harustudy.backend.admin.service.AdminAuthService;
import harustudy.backend.admin.service.AdminService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@Tag(name = "어드민 기능")
@RequiredArgsConstructor
@RestController
public class AdminController {

    private final AdminAuthService adminAuthService;
    private final AdminService adminService;

    @Operation(summary = "어드민 로그인")
    @PostMapping(value = "/admin/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Void> login(AdminLoginRequest request,
                                      HttpServletRequest httpServletRequest) {
        UUID sessionId = adminAuthService.login(request);
        HttpSession session = httpServletRequest.getSession();
        session.setAttribute("SESSION", sessionId);
        session.setMaxInactiveInterval(3600);

        return ResponseEntity.ok().build();
    }

    @Operation(summary = "모든 멤버 조회")
    @GetMapping("/admin/members")
    public ResponseEntity<AdminMembersResponse> findMembers(Pageable pageable, @RequestParam String loginType) {
        AdminMembersResponse response = adminService.findMembers(pageable, loginType);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 조회")
    @GetMapping("/admin/studies")
    public ResponseEntity<List<AdminStudyResponse>> findStudies(Pageable pageable) {
        List<AdminStudyResponse> studies = adminService.findStudies(pageable);
        return ResponseEntity.ok(studies);
    }

    @Operation(summary = "참여자 정보 조회")
    @GetMapping("/admin/participants")
    public ResponseEntity<List<AdminParticipantResponse>> findParticipants(Pageable pageable) {
        List<AdminParticipantResponse> participants = adminService.findParticipants(pageable);
        return ResponseEntity.ok(participants);
    }

    @Operation(summary = "콘텐츠 조회")
    @GetMapping("/admin/contents")
    public ResponseEntity<List<AdminContentResponse>> findContents(Pageable pageable) {
        List<AdminContentResponse> contents = adminService.findContents(pageable);
        return ResponseEntity.ok(contents);
    }

    @Operation(summary = "참여코드 조회")
    @GetMapping("/admin/participant-codes")
    public ResponseEntity<List<AdminParticipantCodeResponse>> findParticipantCodes(Pageable pageable) {
        List<AdminParticipantCodeResponse> participantCodes = adminService.findParticipantCodes(pageable);
        return ResponseEntity.ok(participantCodes);
    }

    @Operation(summary = "오늘 생성된 스터디 조회")
    @GetMapping("/admin/studies/created")
    public ResponseEntity<List<AdminStudyResponse>> findStudiesCreatedToday(Pageable pageable) {
        List<AdminStudyResponse> studies = adminService.findStudiesCreatedToday(pageable);
        return ResponseEntity.ok(studies);
    }

    @Operation(summary = "오늘 완료된 스터디 조회")
    @GetMapping("/admin/studies/done")
    public ResponseEntity<List<AdminStudyResponse>> findStudiesDoneToday(Pageable pageable) {
        List<AdminStudyResponse> studies = adminService.findStudiesDoneToday(pageable);
        return ResponseEntity.ok(studies);
    }

    @Operation(summary = "스터디 정보 및 관련 컨텐츠 조회")
    @GetMapping("/admin/studies/{studyId}/contents")
    public ResponseEntity<AdminStudyContentResponse> findContentsOfStudy(Pageable pageable,
                                                                         @PathVariable Long studyId) {
        AdminStudyContentResponse response = adminService.findContentsOfStudies(pageable, studyId);
        return ResponseEntity.ok(response);
    }
}
