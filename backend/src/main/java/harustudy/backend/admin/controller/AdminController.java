package harustudy.backend.admin.controller;

import harustudy.backend.admin.dto.AdminContentResponse;
import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.dto.AdminMembersResponse;
import harustudy.backend.admin.dto.AdminParticipantCodeResponse;
import harustudy.backend.admin.dto.AdminParticipantResponse;
import harustudy.backend.admin.dto.AdminStudyResponse;
import harustudy.backend.admin.service.AdminAuthService;
import harustudy.backend.admin.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class AdminController {

    private final AdminAuthService adminAuthService;
    private final AdminService adminService;

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Void> login(AdminLoginRequest request,
                                      HttpServletRequest httpServletRequest) {
        UUID sessionId = adminAuthService.login(request);
        HttpSession session = httpServletRequest.getSession();
        session.setAttribute("SESSION", sessionId);
        session.setMaxInactiveInterval(3600);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/members")
    public ResponseEntity<AdminMembersResponse> findMembers(Pageable pageable, @RequestParam String loginType) {
        AdminMembersResponse response = adminService.findMembers(pageable, loginType);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/studies")
    public ResponseEntity<List<AdminStudyResponse>> findStudies(Pageable pageable) {
        List<AdminStudyResponse> studies = adminService.findStudies(pageable);
        return ResponseEntity.ok(studies);
    }

    @GetMapping("/participants")
    public ResponseEntity<List<AdminParticipantResponse>> findParticipants(Pageable pageable) {
        List<AdminParticipantResponse> participants = adminService.findParticipants(pageable);
        return ResponseEntity.ok(participants);
    }

    @GetMapping("/contents")
    public ResponseEntity<List<AdminContentResponse>> findContents(Pageable pageable) {
        List<AdminContentResponse> contents = adminService.findContents(pageable);
        return ResponseEntity.ok(contents);
    }

    @GetMapping("/participant-codes")
    public ResponseEntity<List<AdminParticipantCodeResponse>> findParticipantCodes(Pageable pageable) {
        List<AdminParticipantCodeResponse> participantCodes = adminService.findParticipantCodes(pageable);
        return ResponseEntity.ok(participantCodes);
    }

    @GetMapping("/studies/created")
    public ResponseEntity<List<AdminStudyResponse>> findStudiesCreatedToday(Pageable pageable) {
        List<AdminStudyResponse> studies = adminService.findStudiesCreatedToday(pageable);
        return ResponseEntity.ok(studies);
    }

    @GetMapping("/studies/done")
    public ResponseEntity<List<AdminStudyResponse>> findStudiesDoneToday(Pageable pageable) {
        List<AdminStudyResponse> studies = adminService.findStudiesDoneToday(pageable);
        return ResponseEntity.ok(studies);
    }
}
