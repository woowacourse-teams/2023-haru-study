package harustudy.backend.admin;

import harustudy.backend.admin.service.AdminAuthService;
import harustudy.backend.auth.exception.AuthorizationException;
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

    private final AdminAuthService adminAuthService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (isPreflightRequest(request)) {
            return true;
        }
        HttpSession session = request.getSession(false);
        validateSessionIsNonNull(session);
        UUID uuid = (UUID) session.getAttribute("SESSION");
        adminAuthService.validateSession(uuid);
        return true;
    }

    private boolean isPreflightRequest(HttpServletRequest request) {
        return HttpMethod.OPTIONS.matches(request.getMethod());
    }

    private void validateSessionIsNonNull(HttpSession session) {
        if (session == null) {
            throw new AuthorizationException();
        }
    }
}
