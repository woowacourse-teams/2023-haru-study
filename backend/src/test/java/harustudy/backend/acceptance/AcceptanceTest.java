package harustudy.backend.acceptance;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.domain.oauth.OauthClients;
import harustudy.backend.auth.dto.OauthLoginRequest;
import harustudy.backend.auth.dto.OauthTokenResponse;
import harustudy.backend.auth.dto.TokenResponse;
import harustudy.backend.auth.util.AesTokenProvider;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.integration.LoginResponse;
import harustudy.backend.participant.dto.ParticipantsResponse;
import harustudy.backend.participant.dto.ParticipateStudyRequest;
import harustudy.backend.participantcode.dto.ParticipantCodeResponse;
import harustudy.backend.study.dto.CreateStudyRequest;
import harustudy.backend.study.dto.StudiesResponse;
import harustudy.backend.study.dto.StudyResponse;
import jakarta.servlet.http.Cookie;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
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
@Disabled("무중단 배포를 위한 API 버저닝으로 인한 임시 disabled")
class AcceptanceTest {

    @MockBean
    private OauthClients oauthClients;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AesTokenProvider aesTokenProvider;

    @Autowired
    private TokenConfig tokenConfig;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void 회원으로_스터디를_진행한다() throws Exception {
        LoginResponse 로그인_정보 = 구글_로그인을_진행한다();
        Long 스터디_아이디 = 스터디를_개설한다(로그인_정보);
        Long 참여자_아이디 = 스터디에_참여한다(로그인_정보, 스터디_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디);
        스터디_계획을_작성한다(로그인_정보, 스터디_아이디, 참여자_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디);
        스터디_회고를_작성한다(로그인_정보, 스터디_아이디, 참여자_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디);
        스터디_종료_후_결과_조회(로그인_정보, 스터디_아이디);
    }

    @Test
    void 회원으로_진행했었던_스터디_목록을_조회한다() throws Exception {
        회원으로_스터디를_진행한다();
        회원으로_스터디를_진행한다();
        LoginResponse 로그인_정보 = 구글_로그인을_진행한다();
        List<StudyResponse> 회원으로_완료한_스터디_목록 = 회원으로_진행했던_모든_스터디_목록을_조회한다(로그인_정보);
        for (StudyResponse 스터디_정보 : 회원으로_완료한_스터디_목록) {
            스터디_종료_후_결과_조회(로그인_정보, 스터디_정보.studyId());
        }
    }

    @Test
    void 비회원으로_스터디를_진행한다() throws Exception {
        LoginResponse 로그인_정보 = 비회원_로그인을_진행한다();
        Long 스터디_아이디 = 스터디를_개설한다(로그인_정보);
        Long 진행도_아이디 = 스터디에_참여한다(로그인_정보, 스터디_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디);
        스터디_계획을_작성한다(로그인_정보, 스터디_아이디, 진행도_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디);
        스터디_회고를_작성한다(로그인_정보, 스터디_아이디, 진행도_아이디);
        스터디_상태를_다음_단계로_넘긴다(로그인_정보, 스터디_아이디);
        스터디_종료_후_결과_조회(로그인_정보, 스터디_아이디);
    }

    @Test
    void 비회원으로_타인의_스터디에_참여한다() throws Exception {
        String 참여_코드 = 타인의_스터디_참여_코드를_얻는다();
        LoginResponse 로그인_정보 = 비회원_로그인을_진행한다();
        참여_코드로_스터디_아이디를_얻는다(로그인_정보, 참여_코드);
    }

    private List<StudyResponse> 회원으로_진행했던_모든_스터디_목록을_조회한다(LoginResponse 로그인_정보)
            throws Exception {
        Long memberId = aesTokenProvider.parseSubject(로그인_정보.tokenResponse().accessToken(),
                tokenConfig.secretKey());

        MvcResult result = mockMvc.perform(
                        get("/api/studies")
                                .param("memberId", String.valueOf(memberId))
                                .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        StudiesResponse StudiesResponse = objectMapper.readValue(jsonResponse,
                StudiesResponse.class);

        return StudiesResponse.studies();
    }

    private LoginResponse 비회원_로그인을_진행한다() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/auth/guest"))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        TokenResponse tokenResponse = objectMapper.readValue(jsonResponse, TokenResponse.class);
        return new LoginResponse(tokenResponse, null);
    }

    public LoginResponse 구글_로그인을_진행한다() throws Exception {
        OauthLoginRequest request = new OauthLoginRequest("google", "oauthLoginCode");
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(oauthClients.requestOauthToken(any(String.class), any(String.class)))
                .willReturn(new OauthTokenResponse("mock-token-type", "mock-access-token",
                        "mock-scope"));
        given(oauthClients.requestOauthUserInfo(any(String.class), any(String.class)))
                .willReturn(Map.of("name", "mock-name", "email", "mock-email", "picture",
                        "mock-picture"));

        MvcResult result = mockMvc.perform(
                        post("/api/auth/login")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonRequest))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        Cookie refreshToken = result.getResponse().getCookie("refreshToken");
        TokenResponse tokenResponse = objectMapper.readValue(jsonResponse, TokenResponse.class);
        return new LoginResponse(tokenResponse, refreshToken);
    }

    private Long 스터디를_개설한다(LoginResponse 로그인_정보) throws Exception {
        CreateStudyRequest request = new CreateStudyRequest("studyName", 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);
        MvcResult result = mockMvc.perform(
                        post("/api/studies")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonRequest)
                                .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isCreated())
                .andReturn();
        String locationHeader = result.getResponse().getHeader(HttpHeaders.LOCATION);

        String[] parsed = locationHeader.split("/");
        System.out.println(locationHeader);
        return Long.parseLong(parsed[3]);
    }

    private Long 스터디에_참여한다(LoginResponse 로그인_정보, Long 스터디_아이디) throws Exception {
        Long memberId = aesTokenProvider.parseSubject(로그인_정보.tokenResponse().accessToken(),
                tokenConfig.secretKey());
        ParticipateStudyRequest request = new ParticipateStudyRequest(memberId, "nickname");
        String jsonRequest = objectMapper.writeValueAsString(request);

        MvcResult result = mockMvc.perform(
                        post("/api/studies/{studyId}/participants", 스터디_아이디)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonRequest)
                                .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isCreated())
                .andReturn();

        String location = result.getResponse().getHeader("Location");
        String[] split = location.split("/");
        String participantId = split[split.length - 1];

        return Long.valueOf(participantId);
    }

    private void 스터디_계획을_작성한다(LoginResponse 로그인_정보, Long 스터디_아이디, Long 참여자_아이디) throws Exception {
        WritePlanRequest request = new WritePlanRequest(참여자_아이디, Map.of("plan", "test"));
        String jsonRequest = objectMapper.writeValueAsString(request);

        mockMvc.perform(post("/api/studies/{studyId}/contents/write-plan", 스터디_아이디)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest)
                        .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk());
    }

    private void 스터디_상태를_다음_단계로_넘긴다(LoginResponse 로그인_정보, Long 스터디_아이디)
            throws Exception {
        mockMvc.perform(post("/api/studies/{studyId}/next-step", 스터디_아이디)
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
        MvcResult result = mockMvc.perform(get("/api/studies/{studyId}/participants", 스터디_아이디)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        ParticipantsResponse jsonResponse = objectMapper.readValue(response,
                ParticipantsResponse.class);

        assertThat(jsonResponse.participants()).hasSize(1);
    }

    private String 타인의_스터디_참여_코드를_얻는다() throws Exception {
        LoginResponse 로그인_정보 = 비회원_로그인을_진행한다();
        Long 스터디_아이디 = 스터디를_개설한다(로그인_정보);
        return 스터디_아이디로_참여_코드를_얻는다(로그인_정보, 스터디_아이디);
    }

    private String 스터디_아이디로_참여_코드를_얻는다(LoginResponse 로그인_정보, Long 스터디_아이디) throws Exception {
        MvcResult result = mockMvc.perform(get("/api/participant-codes")
                        .param("studyId", 스터디_아이디.toString())
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        ParticipantCodeResponse jsonResponse = objectMapper.readValue(response,
                ParticipantCodeResponse.class);

        assertThat(jsonResponse.participantCode()).hasSize(6);
        return jsonResponse.participantCode();
    }

    private void 참여_코드로_스터디_아이디를_얻는다(LoginResponse 로그인_정보, String 참여_코드) throws Exception {
        MvcResult result = mockMvc.perform(get("/api/studies")
                        .param("participantCode", 참여_코드)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, 로그인_정보.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();
        String response = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        assertDoesNotThrow(() -> objectMapper.readValue(response, StudyResponse.class));
    }
}
