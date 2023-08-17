package harustudy.backend.auth;

import harustudy.backend.auth.exception.InvalidAuthorizationHeaderException;
import harustudy.backend.auth.service.AuthService;
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

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
            Object handler) throws Exception {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        String[] splitAuthorizationHeader = authorizationHeader.split(" ");
        if (splitAuthorizationHeader.length != 2 ||
                !splitAuthorizationHeader[0].equals("Bearer")) {
            throw new InvalidAuthorizationHeaderException();
        }
        String accessToken = authorizationHeader.split(" ")[1];
        authService.validateAccessToken(accessToken);
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }
}
