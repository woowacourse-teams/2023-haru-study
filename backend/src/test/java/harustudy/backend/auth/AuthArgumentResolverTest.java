package harustudy.backend.auth;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.service.AuthService;
import harustudy.backend.auth.util.BearerAuthorizationParser;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@ExtendWith(MockitoExtension.class)
class AuthArgumentResolverTest {

    @InjectMocks
    private AuthArgumentResolver authArgumentResolver;
    @Mock
    private AuthService authService;
    @Mock
    private BearerAuthorizationParser bearerAuthorizationParser;

    @Test
    void 액세스_토큰의_파싱된_아이디에_해당하는_인증_멤버가_반환된다() {
        // given
        String accessToken = "access-token";
        String mockedAuthMemberId = "1";
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
        NativeWebRequest nativeWebRequest = new ServletWebRequest(request);

        given(bearerAuthorizationParser.parse(any(String.class)))
                .willReturn(accessToken);
        given(authService.parseMemberId(any(String.class)))
                .willReturn(mockedAuthMemberId);

        // when
        AuthMember authMember = authArgumentResolver.resolveArgument(null, null, nativeWebRequest, null);

        // then
        assertThat(authMember.id()).isEqualTo(Long.valueOf(mockedAuthMemberId));
    }
}
