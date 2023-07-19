package harustudy.backend.integration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.dto.request.StudyAuthRequest;
import harustudy.backend.dto.response.StudyAuthResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Sql("/data.sql")
public class ParticipateStudyIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 기존_참여멤버의_참여코드를_인증하고_스터디와_멤버_정보를_반환한다() throws Exception {
        // given
        StudyAuthRequest request = new StudyAuthRequest("ASDFGH", 1L);
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
        StudyAuthResponse response = objectMapper.readValue(jsonResponse,
                StudyAuthResponse.class);

        assertAll(
                () -> assertThat(response.studyId()).isEqualTo(1L),
                () -> assertThat(response.studyName()).isEqualTo("Study 1"),
                () -> assertThat(response.nickname()).isEqualTo("member1")
        );
    }

    @Test
    void 신규멤버의_참여코드를_인증하고_스터디_정보를_반환한다() throws Exception {
        // given
        StudyAuthRequest request = new StudyAuthRequest("ASDFGH", null);
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
        StudyAuthResponse response = objectMapper.readValue(jsonResponse,
                StudyAuthResponse.class);

        assertAll(
                () -> assertThat(response.studyId()).isEqualTo(1L),
                () -> assertThat(response.studyName()).isEqualTo("Study 1"),
                () -> assertThat(response.nickname()).isNull()
        );
    }
}
