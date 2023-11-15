package harustudy.backend.integration;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.member.domain.Member;
import jakarta.servlet.http.Cookie;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
class AuthIntegrationTest extends IntegrationTest {

    @Test
    void 구글_로그인을_한다() throws Exception {
        // TODO : 실제 구글 id로 Oauth 기능 테스트하기
        // given, when
        LoginResponse response = 구글_로그인("member1");

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.tokenResponse().accessToken()).isNotNull();
            softly.assertThat(response.cookie().getValue()).isNotNull();
            softly.assertThat(response.cookie().getName()).isEqualTo("refreshToken");
        });
    }

    @Test
    void 비회원_로그인을_한다() throws Exception {
        // given, when
        MockHttpServletResponse response = mockMvc.perform(
                        post("/api/v2/auth/guest"))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse();

        String jsonResponse = response.getContentAsString(StandardCharsets.UTF_8);
        TokenResponse tokenResponse = objectMapper.readValue(jsonResponse, TokenResponse.class);

        // then
        assertSoftly(softly -> {
            softly.assertThat(tokenResponse.accessToken()).isNotNull();
            softly.assertThat(response.getCookie("refreshToken")).isNull();
        });
    }

    @Test
    void 액세스_토큰을_갱신한다() throws Exception {
        // given
        MemberDto memberDto = createMember("member1");

        Date now = new Date();
        when(customClock.now()).thenReturn(new Date(now.getTime() + 1000L));

        // when
        MvcResult result = mockMvc.perform(
                        post("/api/v2/auth/refresh")
                                .contentType(MediaType.APPLICATION_JSON)
                                .cookie(memberDto.cookie()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        Cookie refreshToken = result.getResponse().getCookie("refreshToken");
        TokenResponse response = objectMapper.readValue(jsonResponse, TokenResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.accessToken()).isNotNull();
            softly.assertThat(response.accessToken()).isNotEqualTo(memberDto.accessToken());
            softly.assertThat(refreshToken).isNotNull();
            softly.assertThat(refreshToken.getName()).isEqualTo("refreshToken");
            softly.assertThat(refreshToken.getValue()).isNotEqualTo(memberDto.cookie().getValue());
        });
    }

    @Test
    void 로그아웃한다() throws Exception {
        // given
        MemberDto memberDto = createMember("member1");
        Member member = generateAndSaveMemberNamedWith("member1");
        RefreshToken refreshToken = generateAndSaveRefreshTokenOf(member);

        // when, then
        mockMvc.perform(post("/api/v2/auth/logout")
                        .cookie(new Cookie("refreshToken", refreshToken.getUuid().toString()))
                        .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andExpect(cookie().maxAge("refreshToken", 0))
                .andReturn();
    }

    private LoginResponse 구글_로그인(String name) throws Exception {
        OauthLoginRequest request = new OauthLoginRequest("google", "oauthLoginCode");
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(oauthClients.requestOauthToken(any(String.class), any(String.class)))
                .willReturn(new OauthTokenResponse("mock-token-type", "mock-access-token",
                        "mock-scope"));
        given(oauthClients.requestOauthUserInfo(any(String.class), any(String.class)))
                .willReturn(Map.of("name", name, "email", "mock-email", "picture", "mock-picture"));

        MvcResult result = mockMvc.perform(
                        post("/api/v2/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonRequest))
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        Cookie refreshToken = result.getResponse().getCookie("refreshToken");
        TokenResponse tokenResponse = objectMapper.readValue(jsonResponse, TokenResponse.class);
        return new LoginResponse(tokenResponse, refreshToken);
    }
}
