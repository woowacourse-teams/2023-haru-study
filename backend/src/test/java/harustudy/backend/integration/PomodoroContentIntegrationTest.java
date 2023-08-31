package harustudy.backend.integration;


import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.dto.PomodoroContentResponse;
import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.domain.CodeGenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
public class PomodoroContentIntegrationTest extends IntegrationTest {

    private PomodoroRoom pomodoroRoom;
    private MemberDto memberDto;

    private PomodoroProgress pomodoroProgress;
    private PomodoroContent pomodoroContent;

    @BeforeEach
    void setUp() {
        super.setUp();

        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        pomodoroRoom = new PomodoroRoom("roomName", 2, 20, participantCode);
        memberDto = createMember("member1");
        pomodoroProgress = new PomodoroProgress(pomodoroRoom, memberDto.member(), "nickname");
        pomodoroContent = new PomodoroContent(pomodoroProgress, 1);

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);
        entityManager.persist(pomodoroProgress);
        entityManager.persist(pomodoroContent);

        FLUSH_AND_CLEAR_CONTEXT();
    }

    @Test
    void 계획을_작성할_수_있다() throws Exception {
        // given
        WritePlanRequest request = new WritePlanRequest(pomodoroProgress.getId(),
                Map.of("plan", "test"));
        String body = objectMapper.writeValueAsString(request);

        // when, then
        mockMvc.perform(
                        post("/api/studies/{studyId}/contents/write-plan", pomodoroRoom.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk());
    }

    @Test
    void 회고를_작성할_수_있다() throws Exception {
        // given
        pomodoroContent.changePlan(Map.of("plan", "test"));
        pomodoroProgress.proceed();
        pomodoroProgress.proceed();

        entityManager.merge(pomodoroProgress);
        entityManager.merge(pomodoroContent);
        FLUSH_AND_CLEAR_CONTEXT();

        WriteRetrospectRequest request = new WriteRetrospectRequest(pomodoroProgress.getId(),
                Map.of("retrospect", "test"));
        String body = objectMapper.writeValueAsString(request);

        // when, then
        mockMvc.perform(
                        post("/api/studies/{studyId}/contents/write-retrospect", pomodoroRoom.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk());
    }

    @Test
    void 특정_사이클의_계획_및_회고를_조회할_수_있다() throws Exception {
        // given
        Map<String, String> plan = Map.of("plan", "test");
        Map<String, String> retrospect = Map.of("retrospect", "test");
        pomodoroContent.changePlan(plan);
        pomodoroProgress.proceed();
        pomodoroProgress.proceed();
        pomodoroContent.changeRetrospect(retrospect);
        pomodoroProgress.proceed();

        entityManager.merge(pomodoroContent);
        FLUSH_AND_CLEAR_CONTEXT();

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/contents", pomodoroRoom.getId())
                                .param("progressId", String.valueOf(pomodoroProgress.getId()))
                                .param("memberId", String.valueOf(memberDto.member().getId()))
                                .param("cycle", String.valueOf(pomodoroContent.getCycle()))
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroContentsResponse response = objectMapper.readValue(jsonResponse,
                PomodoroContentsResponse.class);
        PomodoroContentsResponse expected = new PomodoroContentsResponse(List.of(
                new PomodoroContentResponse(pomodoroContent.getCycle(), plan, retrospect)
        ));

        assertThat(response).isEqualTo(expected);
    }

    @Test
    void 모든_사이클의_계획_및_회고를_조회할_수_있다() throws Exception {
        // given
        Map<String, String> plan = Map.of("plan", "test");
        Map<String, String> retrospect = Map.of("retrospect", "test");
        pomodoroContent.changePlan(plan);
        pomodoroContent.changeRetrospect(retrospect);

        PomodoroContent anotherPomodoroContent = new PomodoroContent(pomodoroProgress, 2);
        Map<String, String> anotherPlan = Map.of("plan", "test");
        Map<String, String> anotherRetrospect = Map.of("retrospect", "test");
        anotherPomodoroContent.changePlan(anotherPlan);
        anotherPomodoroContent.changeRetrospect(anotherRetrospect);

        entityManager.merge(pomodoroContent);
        entityManager.merge(pomodoroProgress);
        entityManager.persist(anotherPomodoroContent);
        FLUSH_AND_CLEAR_CONTEXT();

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/contents", pomodoroRoom.getId())
                                .param("progressId", String.valueOf(pomodoroProgress.getId()))
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        PomodoroContentsResponse response = objectMapper.readValue(jsonResponse,
                PomodoroContentsResponse.class);
        PomodoroContentsResponse expected = new PomodoroContentsResponse(List.of(
                new PomodoroContentResponse(pomodoroContent.getCycle(), plan, retrospect),
                new PomodoroContentResponse(anotherPomodoroContent.getCycle(), anotherPlan,
                        anotherRetrospect)
        ));

        assertThat(response).isEqualTo(expected);
    }
}
