package harustudy.backend.integration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.participantcode.dto.FindRoomRequest;
import harustudy.backend.participantcode.dto.FindRoomResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class AuthenticateIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 참여코드를_인증하고_스터디_정보를_반환한다() throws Exception {
        // given
        FindRoomRequest request = new FindRoomRequest(participantCode.getCode());
        String jsonRequest = objectMapper.writeValueAsString(request);

        // when
        MvcResult result = mockMvc.perform(
                        post("/api/studies/authenticate")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        FindRoomResponse response = objectMapper.readValue(jsonResponse,
                FindRoomResponse.class);

        assertAll(
                () -> assertThat(response.studyId()).isEqualTo(pomodoroRoom.getId()),
                () -> assertThat(response.studyName()).isEqualTo(pomodoroRoom.getName())
        );
    }
}
