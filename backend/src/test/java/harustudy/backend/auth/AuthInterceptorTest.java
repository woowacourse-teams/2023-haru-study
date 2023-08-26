package harustudy.backend.auth;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.then;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.times;

import harustudy.backend.auth.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpMethod;
import org.springframework.mock.web.MockHttpServletRequest;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
class AuthInterceptorTest {

    @Autowired
    private AuthInterceptor authInterceptor;

    @MockBean
    private AuthService authService;

    @Mock
    private HttpServletResponse httpServletResponse;

    @Test
    void preflight_요청시_예외를_던지지_않는다() {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.setMethod(HttpMethod.OPTIONS.name());
        Object handler = new Object();

        // when, then
        assertThatCode(() -> authInterceptor.preHandle(request, httpServletResponse, handler))
                .doesNotThrowAnyException();
    }

    @Test
    void 액세스_토큰_검증을_수행한다() throws Exception {
        // given
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer access-token");
        Object handler = new Object();

        willDoNothing()
                .given(authService)
                .validateAccessToken(any());

        // when
        authInterceptor.preHandle(request, httpServletResponse, handler);

        // then
        then(authService)
                .should(times(1))
                .validateAccessToken(any());
    }
}
