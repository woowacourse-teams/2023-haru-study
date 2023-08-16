package harustudy.backend.integration;

import harustudy.backend.auth.dto.TokenResponse;
import jakarta.servlet.http.Cookie;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class AuthIntegrationTest extends IntegrationTest {

    @BeforeEach
    void setUp() {
        super.setUp();
    }

    @Test
    void 구글_로그인을_한다() throws Exception {
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
        LoginResponse response = 비회원_로그인();

        // then
        assertSoftly(softly -> {
            softly.assertThat(response.tokenResponse().accessToken()).isNotNull();
            softly.assertThat(response.cookie()).isNull();
        });
    }

    @Test
    void 액세스_토큰을_갱신한다() throws Exception {
        // given
        LoginResponse loginResponse = 구글_로그인("member");

        // access token을 재발급 하더라도 Date는 초 단위의 시간 정보를 담은 액세스 토큰을 생성하기 때문에
        // 같은 access token이 만들어지는 문제가 있어서 갱신된다는 것을 검증하기 위해 사용
        Thread.sleep(1000);

        // when
        MvcResult result = mockMvc.perform(
                        post("/api/auth/refresh")
                                .contentType(MediaType.APPLICATION_JSON)
                                .cookie(loginResponse.cookie()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        Cookie refreshToken = result.getResponse().getCookie("refreshToken");
        TokenResponse response = objectMapper.readValue(jsonResponse, TokenResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.accessToken()).isNotNull();
            softly.assertThat(response.accessToken()).isNotEqualTo(loginResponse.tokenResponse().accessToken());
            softly.assertThat(refreshToken).isNotNull();
            softly.assertThat(refreshToken.getName()).isEqualTo("refreshToken");
            softly.assertThat(refreshToken.getValue()).isNotEqualTo(loginResponse.cookie().getValue());
        });
    }
}
