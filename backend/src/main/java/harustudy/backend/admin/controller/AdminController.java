package harustudy.backend.admin.controller;

import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.dto.AdminMemberResponse;
import harustudy.backend.admin.dto.AdminParticipantResponse;
import harustudy.backend.admin.dto.AdminStudyResponse;
import harustudy.backend.admin.service.AdminService;
import harustudy.backend.study.dto.StudiesResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("/admin")
@RestController
public class AdminController {

    private final AdminService adminService;

    @PostMapping(value = "/login", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<Void> login(AdminLoginRequest request,
                                      HttpServletRequest httpServletRequest) {
        UUID sessionId = adminService.login(request);
        HttpSession session = httpServletRequest.getSession();
        session.setAttribute("SESSION", sessionId);
        session.setMaxInactiveInterval(3600);

        return ResponseEntity.ok().build();
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

    @GetMapping("/members")
    public ResponseEntity<List<AdminMemberResponse>> findMembers(Pageable pageable) {
        List<AdminMemberResponse> members = adminService.findMembers(pageable);
        return ResponseEntity.ok(members);
    }
}
