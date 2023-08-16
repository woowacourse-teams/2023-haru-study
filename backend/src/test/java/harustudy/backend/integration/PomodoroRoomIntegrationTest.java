package harustudy.backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.util.JwtTokenProvider;
import harustudy.backend.progress.dto.ParticipateStudyRequest;
import harustudy.backend.room.domain.CodeGenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomsResponse;
import jakarta.persistence.EntityManager;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroRoomIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenConfig tokenConfig;

    private ParticipantCode participantCode1;
    private ParticipantCode participantCode2;
    private PomodoroRoom pomodoroRoom1;
    private PomodoroRoom pomodoroRoom2;

    @BeforeEach
    void setUp() {
        super.setMockMvc();
        participantCode1 = new ParticipantCode(new CodeGenerationStrategy());
        participantCode2 = new ParticipantCode(new CodeGenerationStrategy());
        pomodoroRoom1 = new PomodoroRoom("room1", 3, 20, participantCode1);
        pomodoroRoom2 = new PomodoroRoom("room2", 4, 30, participantCode2);

        entityManager.persist(participantCode1);
        entityManager.persist(participantCode2);
        entityManager.persist(pomodoroRoom1);
        entityManager.persist(pomodoroRoom2);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 스터디_아이디로_스터디를_조회한다() throws Exception {
        // given
        LoginResponse loginResponse = 구글_로그인("member");
        Long roomId = pomodoroRoom1.getId();

        // when
        MvcResult result = mockMvc.perform(get("/api/studies/{studyId}", roomId)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, loginResponse.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroRoomResponse response = objectMapper.readValue(jsonResponse,
                PomodoroRoomResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.studyId()).isEqualTo(pomodoroRoom1.getId());
            softly.assertThat(response.name()).isEqualTo(pomodoroRoom1.getName());
            softly.assertThat(response.totalCycle()).isEqualTo(pomodoroRoom1.getTotalCycle());
            softly.assertThat(response.timePerCycle()).isEqualTo(pomodoroRoom1.getTimePerCycle());
        });
    }

    @Test
    void 참여코드로_스터디를_조회한다() throws Exception {
        // given
        LoginResponse loginResponse = 구글_로그인("member");

        // when
        MvcResult result = mockMvc.perform(get("/api/studies")
                        .param("participantCode", participantCode1.getCode())
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, loginResponse.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroRoomsResponse response = objectMapper.readValue(jsonResponse, PomodoroRoomsResponse.class);
        List<PomodoroRoomResponse> studies = response.studies();

        assertSoftly(softly -> {
            softly.assertThat(studies).hasSize(1);
            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroRoom1.getId());
            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroRoom1.getName());
            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroRoom1.getTotalCycle());
            softly.assertThat(studies.get(0).timePerCycle()).isEqualTo(pomodoroRoom1.getTimePerCycle());
        });
    }

    @Test
    void 멤버_아이디로_스터디를_조회한다() throws Exception {
        // given
        LoginResponse loginResponse = 구글_로그인("member");
        String accessToken = loginResponse.tokenResponse().accessToken();
        String memberId = jwtTokenProvider.parseSubject(accessToken, tokenConfig.secretKey());

        스터디_참여_요청(loginResponse, memberId, "nickname");

        // when
        MvcResult result = mockMvc.perform(get("/api/studies")
                        .param("memberId", memberId)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, loginResponse.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroRoomsResponse response = objectMapper.readValue(jsonResponse, PomodoroRoomsResponse.class);
        List<PomodoroRoomResponse> studies = response.studies();

        assertSoftly(softly -> {
            softly.assertThat(studies).hasSize(1);
            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroRoom1.getId());
            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroRoom1.getName());
            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroRoom1.getTotalCycle());
            softly.assertThat(studies.get(0).timePerCycle()).isEqualTo(pomodoroRoom1.getTimePerCycle());
        });
    }

    private void 스터디_참여_요청(LoginResponse loginResponse, String memberId, String nickname) throws Exception {
        ParticipateStudyRequest participateStudyRequest = new ParticipateStudyRequest(Long.valueOf(memberId), nickname);
        String jsonRequest = objectMapper.writeValueAsString(participateStudyRequest);

        mockMvc.perform(post("/api/studies/{studyId}/progresses", pomodoroRoom1.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest)
                .header(HttpHeaders.AUTHORIZATION, loginResponse.createAuthorizationHeader()));
    }

    @Test
    void 모든_스터디를_조회한다() throws Exception {
        // given
        LoginResponse loginResponse = 구글_로그인("member");

        // when
        MvcResult result = mockMvc.perform(get("/api/studies")
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, loginResponse.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroRoomsResponse response = objectMapper.readValue(jsonResponse, PomodoroRoomsResponse.class);
        List<PomodoroRoomResponse> studies = response.studies();

        assertSoftly(softly -> {
            softly.assertThat(studies).hasSize(2);
            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroRoom1.getId());
            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroRoom1.getName());
            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroRoom1.getTotalCycle());
            softly.assertThat(studies.get(0).timePerCycle()).isEqualTo(pomodoroRoom1.getTimePerCycle());
            softly.assertThat(studies.get(1).studyId()).isEqualTo(pomodoroRoom2.getId());
            softly.assertThat(studies.get(1).name()).isEqualTo(pomodoroRoom2.getName());
            softly.assertThat(studies.get(1).totalCycle()).isEqualTo(pomodoroRoom2.getTotalCycle());
            softly.assertThat(studies.get(1).timePerCycle()).isEqualTo(pomodoroRoom2.getTimePerCycle());
        });
    }

    @Test
    void 스터디를_개설한다() throws Exception {
        // given
        LoginResponse loginResponse = 구글_로그인("member");
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("studyName", 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);

        // when
        MvcResult result = mockMvc.perform(post("/api/studies")
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, loginResponse.createAuthorizationHeader()))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        CreatePomodoroRoomResponse response = objectMapper.readValue(jsonResponse, CreatePomodoroRoomResponse.class);

        assertThat(response.participantCode())
                .isAlphabetic()
                .isUpperCase()
                .hasSize(6);
    }
}
