package harustudy.backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponseV2;
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

    @Test
    void 스터디_아이디로_스터디를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(get("/api/v2/studies/{studyId}", pomodoroRoom.getId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
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
        MvcResult result = mockMvc.perform(get("/api/v2/studies?participantCode=" + participantCode.getCode())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
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

        String jsonResponse = result.getResponse().getContentAsString();
        CreatePomodoroRoomResponse response = objectMapper.readValue(jsonResponse, CreatePomodoroRoomResponse.class);

        // then
        assertThat(response.participantCode())
                .isAlphabetic()
                .isUpperCase()
                .hasSize(6);
    }
}
