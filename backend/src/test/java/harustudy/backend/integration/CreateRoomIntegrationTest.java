package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class CreateRoomIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 스터디가_생성된다() throws Exception {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("studyName", 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);
        // when
        MvcResult result = mockMvc.perform(post("/api/studies")
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        CreatePomodoroRoomResponse response = objectMapper.readValue(jsonResponse,
                new TypeReference<>() {
                });
        // then
        assertThat(response.participantCode())
                .isAlphabetic()
                .isUpperCase()
                .hasSize(6);
    }
}