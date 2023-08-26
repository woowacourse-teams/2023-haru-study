package harustudy.backend.auth;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.service.AuthService;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
class AuthArgumentResolverTest {

    @Autowired
    private AuthArgumentResolver authArgumentResolver;

    @MockBean
    private AuthService authService;

    @Mock
    private MethodParameter methodParameter;
    @Mock
    private ModelAndViewContainer modelAndViewContainer;
    @Mock
    private WebDataBinderFactory webDataBinderFactory;

    @Test
    void 액세스_토큰의_파싱된_아이디에_해당하는_인증_멤버가_반환된다() {
        // given
        String accessToken = "access-token";
        String mockedAuthMemberId = "1";
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
        NativeWebRequest nativeWebRequest = new ServletWebRequest(request);

        given(authService.parseMemberId(any()))
                .willReturn(mockedAuthMemberId);

        // when
        AuthMember authMember = authArgumentResolver.resolveArgument(methodParameter,
                modelAndViewContainer, nativeWebRequest, webDataBinderFactory);

        // then
        assertThat(authMember.id()).isEqualTo(Long.valueOf(mockedAuthMemberId));
    }
}
