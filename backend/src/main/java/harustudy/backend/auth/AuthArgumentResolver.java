package harustudy.backend.auth;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.service.AuthService;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
@Component
public class AuthArgumentResolver implements HandlerMethodArgumentResolver {

    private static final int ACCESS_TOKEN_LOCATION = 1;

    private final AuthService authService;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Authenticated.class);
    }

    @Override
    public AuthMember resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                      NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String authorizationHeader = webRequest.getHeader(HttpHeaders.AUTHORIZATION);
        Objects.requireNonNull(authorizationHeader);
        String accessToken = authorizationHeader.split(" ")[ACCESS_TOKEN_LOCATION];
        long memberId = Long.parseLong(authService.parseMemberId(accessToken));
        return new AuthMember(memberId);
    }
}
