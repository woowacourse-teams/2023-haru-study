package harustudy.backend.admin.controller;

import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
