package harustudy.backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.service.AuthService;
import harustudy.backend.auth.util.JwtTokenProvider;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.Cookie;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@AutoConfigureMockMvc
@Transactional
@SpringBootTest
class IntegrationTest {

    @PersistenceContext
    protected EntityManager entityManager;

    @Autowired
    protected ObjectMapper objectMapper;

    protected MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @SpyBean
    private AuthService authService;

    @Autowired
    private TokenConfig tokenConfig;

    void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    void FLUSH_AND_CLEAR_CONTEXT() {
        entityManager.flush();
        entityManager.clear();
    }

    protected void setMockMvc() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    protected LoginResponse 구글_로그인(String name) throws Exception {
        OauthLoginRequest request = new OauthLoginRequest("google", "oauthLoginCode");
        String jsonRequest = objectMapper.writeValueAsString(request);

        Member member = new Member(name, name + " email", name + " imageUrl", LoginType.GOOGLE);
        entityManager.persist(member);

        entityManager.flush();
        entityManager.clear();

        doReturn(TokenResponse
                .forLoggedIn(
                        jwtTokenProvider.createAccessToken(String.valueOf(member.getId()), tokenConfig.accessTokenExpireLength(), tokenConfig.secretKey()),
                        saveRefreshTokenOf(member)))
                .when(authService).oauthLogin(any());

        MvcResult result = mockMvc.perform(
                        post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonRequest))
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        Cookie refreshToken = result.getResponse().getCookie("refreshToken");
        TokenResponse tokenResponse = objectMapper.readValue(jsonResponse, TokenResponse.class);
        return new LoginResponse(tokenResponse, refreshToken);
    }

    private RefreshToken saveRefreshTokenOf(Member member) {
        RefreshToken refreshToken = new RefreshToken(member, tokenConfig.refreshTokenExpireLength());
        entityManager.persist(refreshToken);
        return refreshToken;
    }

    protected LoginResponse 비회원_로그인() throws Exception {
        MockHttpServletResponse response = mockMvc.perform(
                        post("/api/auth/guest"))
                .andReturn()
                .getResponse();

        String jsonResponse = response.getContentAsString(StandardCharsets.UTF_8);
        TokenResponse tokenResponse = objectMapper.readValue(jsonResponse, TokenResponse.class);
        return new LoginResponse(tokenResponse, null);
    }
}
