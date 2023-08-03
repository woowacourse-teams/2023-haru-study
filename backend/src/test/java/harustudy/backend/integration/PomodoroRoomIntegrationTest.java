package harustudy.backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponseV2;
import jakarta.persistence.EntityManager;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
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

    private ParticipantCode participantCode;
    private PomodoroRoom pomodoroRoom;

    @BeforeEach
    void setUp() {
        super.setMockMvc();
        participantCode = new ParticipantCode(new CodeGenerationStrategy());
        pomodoroRoom = new PomodoroRoom("room", 3, 20, participantCode);

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 스터디_아이디로_스터디를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(get("/api/v2/studies/{studyId}", pomodoroRoom.getId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroRoomResponseV2 response = objectMapper.readValue(jsonResponse,
                PomodoroRoomResponseV2.class);

        assertAll(
                () -> assertThat(response.name()).isEqualTo(pomodoroRoom.getName()),
                () -> assertThat(response.totalCycle()).isEqualTo(pomodoroRoom.getTotalCycle()),
                () -> assertThat(response.timePerCycle()).isEqualTo(pomodoroRoom.getTimePerCycle())
        );
    }

    @Test
    void 참여코드로_스터디를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(get("/api/v2/studies")
                        .param("participantCode", participantCode.getCode())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroRoomResponseV2 response = objectMapper.readValue(jsonResponse,
                PomodoroRoomResponseV2.class);

        assertAll(
                () -> assertThat(response.name()).isEqualTo(pomodoroRoom.getName()),
                () -> assertThat(response.totalCycle()).isEqualTo(pomodoroRoom.getTotalCycle()),
                () -> assertThat(response.timePerCycle()).isEqualTo(pomodoroRoom.getTimePerCycle())
        );
    }

    @Test
    void 스터디를_개설한다() throws Exception {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("studyName", 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);

        // when
        MvcResult result = mockMvc.perform(post("/api/v2/studies")
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
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
