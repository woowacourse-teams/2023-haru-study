package harustudy.backend.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.auth.config.OauthProperty;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.infrastructure.GoogleOauthClient;
import harustudy.backend.auth.util.JwtTokenProvider;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.integration.LoginResponse;
import harustudy.backend.progress.dto.ParticipateStudyRequest;
import harustudy.backend.progress.dto.PomodoroProgressesResponse;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomsResponse;
import jakarta.servlet.http.Cookie;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class AcceptanceTest {

    @MockBean
    GoogleOauthClient googleOauthClient;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenConfig tokenConfig;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void 스터디를_진행한다() throws Exception {
        LoginResponse 로그인_정보 = 구글_로그인을_진행한다();
        String 참여_코드 = 스터디를_개설한다(로그인_정보);
        Long 스터디_아이디 = 스터디를_조회한다(로그인_정보, 참여_코드);
        Long 진행도_아이디 = 스터디에_참여한다(로그인_정보, 스터디_아이디);
        스터디_계획을_작성한다(로그인_정보, 스터디_아이디, 진행도_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디, 진행도_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디, 진행도_아이디);
        스터디_회고를_작성한다(로그인_정보, 스터디_아이디, 진행도_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디, 진행도_아이디);
        스터디_종료_후_결과_조회(로그인_정보, 스터디_아이디);
    }

    public LoginResponse 구글_로그인을_진행한다() throws Exception {
        OauthLoginRequest request = new OauthLoginRequest("google", "oauthLoginCode");
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(googleOauthClient.requestOauthToken(any(String.class), any(OauthProperty.class)))
                .willReturn(new OauthTokenResponse("mock-token-type", "mock-access-token",
                        "mock-scope"));
        given(googleOauthClient.requestOauthUserInfo(any(OauthProperty.class), any(String.class)))
                .willReturn(Map.of("name", "mock-name", "email", "mock-email", "picture",
                        "mock-picture"));

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

    private String 스터디를_개설한다(LoginResponse 로그인_정보) throws Exception {
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("roomName", 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);
        MvcResult result = mockMvc.perform(
                        post("/api/studies")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonRequest)
                                .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isCreated())
                .andReturn();
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        CreatePomodoroRoomResponse response = objectMapper.readValue(jsonResponse,
                CreatePomodoroRoomResponse.class);
        return response.participantCode();
    }

    private Long 스터디를_조회한다(LoginResponse 로그인_정보, String 참여_코드) throws Exception {
        MvcResult result = mockMvc.perform(
                        get("/api/studies")
                                .param("participantCode", 참여_코드)
                                .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroRoomsResponse responses = objectMapper.readValue(jsonResponse,
                PomodoroRoomsResponse.class);
        PomodoroRoomResponse response = responses.studies().get(0);
        return response.studyId();
    }

    private Long 스터디에_참여한다(LoginResponse 로그인_정보, Long 스터디_아이디) throws Exception {
        Long memberId = Long.valueOf(jwtTokenProvider
                .parseSubject(로그인_정보.tokenResponse().accessToken(), tokenConfig.secretKey()));
        ParticipateStudyRequest request = new ParticipateStudyRequest(memberId, "nickname");
        String jsonRequest = objectMapper.writeValueAsString(request);

        MvcResult result = mockMvc.perform(
                        post("/api/studies/{studyId}/progresses", 스터디_아이디)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonRequest)
                                .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isCreated())
                .andReturn();

        String location = result.getResponse().getHeader("Location");
        String[] split = location.split("/");
        String progressId = split[split.length - 1];

        return Long.valueOf(progressId);
    }

    private void 스터디_계획을_작성한다(LoginResponse 로그인_정보, Long 스터디_아이디, Long 진행도_아이디) throws Exception {
        WritePlanRequest request = new WritePlanRequest(진행도_아이디, Map.of("plan", "test"));
        String jsonRequest = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/studies/{studyId}/contents/write-plan",
                        스터디_아이디)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest)
                        .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk());
    }

    private void 스터디_상태를_다음_단계로_넘긴다(LoginResponse 로그인_정보, Long 스터디_아이디, Long 진행도_아이디)
            throws Exception {
        mockMvc.perform(post("/api/studies/{studyId}/progresses/{progressId}/next-step",
                        스터디_아이디, 진행도_아이디)
                        .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isNoContent());
    }

    private void 스터디_회고를_작성한다(LoginResponse 로그인_정보, Long 스터디_아이디, Long 진행도_아이디) throws Exception {
        WriteRetrospectRequest request = new WriteRetrospectRequest(진행도_아이디,
                Map.of("retrospect", "test"));
        String jsonRequest = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/studies/{studyId}/contents/write-retrospect",
                        스터디_아이디)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest)
                        .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk());
    }

    private void 스터디_종료_후_결과_조회(LoginResponse 로그인_정보, Long 스터디_아이디) throws Exception {
        MvcResult result = mockMvc.perform(get("/api/studies/{studyId}/progresses", 스터디_아이디)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroProgressesResponse jsonResponse = objectMapper.readValue(response,
                PomodoroProgressesResponse.class);

        assertThat(jsonResponse.progresses()).hasSize(1);
    }
}
