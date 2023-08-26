package harustudy.backend.auth;

import harustudy.backend.auth.service.AuthService;
import harustudy.backend.auth.util.BearerAuthorizationParser;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@RequiredArgsConstructor
@Component
public class AuthInterceptor implements HandlerInterceptor {

    private final AuthService authService;
    private final BearerAuthorizationParser bearerAuthorizationParser;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
            Object handler) throws Exception {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String accessToken = bearerAuthorizationParser.parse(authorizationHeader);
        authService.validateAccessToken(accessToken);
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
