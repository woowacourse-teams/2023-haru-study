package harustudy.backend.admin;

import harustudy.backend.admin.service.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class AdminInterceptor implements HandlerInterceptor {

    private final AdminService adminService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }
        HttpSession session = request.getSession();
        UUID uuid = (UUID) session.getAttribute("SESSION");
        adminService.validateSession(uuid);
        return true;
    }
}
