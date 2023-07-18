package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.controller.CreatePomodoroStudyResponse;
import harustudy.backend.entity.GenerationStrategy;
import harustudy.backend.repository.ParticipantCodeRepository;
import harustudy.backend.repository.StudyRepository;
import harustudy.backend.service.CreatePomodoroStudyService;
import harustudy.backend.controller.CreatePomodoroStudyRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;


class CreateStudyIntegrationTest extends IntegrationTest {

    @Autowired
    private StudyRepository studyRepository;
    @Autowired
    private ParticipantCodeRepository participantCodeRepository;
    @Autowired
    private CreatePomodoroStudyService createPomodoroStudyService;
    @Autowired
    private GenerationStrategy generationStrategy;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 스터디가_생성된다() throws Exception {
        // given
        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("studyName", 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);
        // when
        MvcResult result = mockMvc.perform(
                        post("/api/studies")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString();
        CreatePomodoroStudyResponse response = objectMapper.readValue(jsonResponse,
                new TypeReference<>() {
                });
        // then
        assertThat(response.participantCode())
                .isAlphabetic()
                .isUpperCase()
                .hasSize(6);
    }
}
