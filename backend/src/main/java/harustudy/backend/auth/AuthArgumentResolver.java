package harustudy.backend.auth;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.service.AuthService;
import harustudy.backend.auth.util.BearerAuthorizationParser;
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

    private final AuthService authService;

    private final BearerAuthorizationParser bearerAuthorizationParser;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(Authenticated.class);
    }

    @Override
    public AuthMember resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                      NativeWebRequest webRequest, WebDataBinderFactory binderFactory) {
        String authorizationHeader = webRequest.getHeader(HttpHeaders.AUTHORIZATION);
        String accessToken = bearerAuthorizationParser.parse(authorizationHeader);
        return new AuthMember(authService.parseMemberId(accessToken));
    }
}
