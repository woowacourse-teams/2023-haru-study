package harustudy.backend.study.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.participantcode.service.StudyAuthService;
import harustudy.backend.progress.service.PomodoroProgressService;
import harustudy.backend.study.dto.CreatePomodoroStudyDto;
import harustudy.backend.study.dto.CreatePomodoroStudyRequest;
import harustudy.backend.study.service.CreatePomodoroStudyService;
import harustudy.backend.study.service.ParticipateService;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@MockBean(JpaMetamodelMappingContext.class)
@WebMvcTest(StudyController.class)
class ParticipantCodeControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private CreatePomodoroStudyService createPomodoroStudyService;
    @MockBean
    private PomodoroProgressService pomodoroProgressService;
    @MockBean
    private StudyAuthService studyAuthService;
    @MockBean
    private ParticipateService participateService;
    @Autowired
    private ObjectMapper objectMapper;

    @ParameterizedTest
    @ValueSource(strings = {"", "12345678910"})
    void 이름이_잘못된_경우_예외를_반환한다(String name) throws Exception {
        // given
        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest(name, 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(createPomodoroStudyService.createStudy(any(CreatePomodoroStudyRequest.class)))
                .willReturn(new CreatePomodoroStudyDto(1L, "123456"));
        // when, then
        mockMvc.perform(
                        post("/api/studies")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 9})
    void 사이클_수가_잘못된_경우_예외를_반환한다(int totalCycle) throws Exception {
        // given
        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("123", totalCycle, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(createPomodoroStudyService.createStudy(any(CreatePomodoroStudyRequest.class)))
                .willReturn(new CreatePomodoroStudyDto(1L, "123456"));
        // when, then
        mockMvc.perform(
                        post("/api/studies")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @ValueSource(ints = {19, 41})
    void 사이클_당_시간이_잘못된_경우_예외를_반환한다(int timePerCycle) throws Exception {
        // given
        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("123", 1,
                timePerCycle);
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(createPomodoroStudyService.createStudy(any(CreatePomodoroStudyRequest.class)))
                .willReturn(new CreatePomodoroStudyDto(1L, "123456"));
        // when, then
        mockMvc.perform(
                        post("/api/studies")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
