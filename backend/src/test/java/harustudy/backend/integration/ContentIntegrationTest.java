package harustudy.backend.integration;


import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.content.domain.Content;
import harustudy.backend.content.dto.ContentResponse;
import harustudy.backend.content.dto.ContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.study.domain.Study;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

import harustudy.backend.testutils.EntityManagerUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
class ContentIntegrationTest extends IntegrationTest {

    private Study study;
    private MemberDto memberDto;

    private Participant participant;
    private Content content;

    @BeforeEach
    void setUp() {
        super.setUp();

        study = new Study("studyName", 2, 20);
        memberDto = createMember("member1");
        participant = Participant.createParticipantOfStudy(study, memberDto.member(), "nickname");
        content = new Content(participant, 1);

        entityManager.persist(study);
        entityManager.persist(participant);
        entityManager.persist(content);

        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    @Test
    void 계획을_작성할_수_있다() throws Exception {
        // given
        WritePlanRequest request = new WritePlanRequest(participant.getId(),
                Map.of("plan", "test"));
        String body = objectMapper.writeValueAsString(request);

        study.proceed();
        entityManager.merge(study);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when, then
        mockMvc.perform(
                        post("/api/v2/studies/{studyId}/contents/write-plan", study.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body)
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk());
    }

    @Test
    void 회고를_작성할_수_있다() throws Exception {
        // given
        content.changePlan(Map.of("plan", "test"));
        study.proceed();
        study.proceed();
        study.proceed();

        entityManager.merge(study);
        entityManager.merge(content);
        EntityManagerUtil.flushAndClearContext(entityManager);

        WriteRetrospectRequest request = new WriteRetrospectRequest(participant.getId(),
                Map.of("retrospect", "test"));
        String body = objectMapper.writeValueAsString(request);

        // when, then
        mockMvc.perform(
                        post("/api/v2/studies/{studyId}/contents/write-retrospect", study.getId())
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
        content.changePlan(plan);
        study.proceed();
        study.proceed();
        content.changeRetrospect(retrospect);
        study.proceed();

        entityManager.merge(study);
        entityManager.merge(content);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/v2/studies/{studyId}/contents", study.getId())
                                .param("participantId", String.valueOf(participant.getId()))
                                .param("memberId", String.valueOf(memberDto.member().getId()))
                                .param("cycle", String.valueOf(content.getCycle()))
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        ContentsResponse response = objectMapper.readValue(jsonResponse,
                ContentsResponse.class);
        ContentsResponse expected = new ContentsResponse(List.of(
                new ContentResponse(content.getCycle(), plan, retrospect)
        ));

        assertThat(response).isEqualTo(expected);
    }

    @Test
    void 모든_사이클의_계획_및_회고를_조회할_수_있다() throws Exception {
        // given
        Map<String, String> plan = Map.of("plan", "test");
        Map<String, String> retrospect = Map.of("retrospect", "test");
        content.changePlan(plan);
        content.changeRetrospect(retrospect);

        Content anotherContent = new Content(participant, 1);
        Map<String, String> anotherPlan = Map.of("plan", "test");
        Map<String, String> anotherRetrospect = Map.of("retrospect", "test");
        anotherContent.changePlan(anotherPlan);
        anotherContent.changeRetrospect(anotherRetrospect);

        entityManager.merge(content);
        entityManager.merge(participant);
        entityManager.persist(anotherContent);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/v2/studies/{studyId}/contents", study.getId())
                                .param("participantId", String.valueOf(participant.getId()))
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        ContentsResponse response = objectMapper.readValue(jsonResponse,
                ContentsResponse.class);
        ContentsResponse expected = new ContentsResponse(List.of(
                new ContentResponse(content.getCycle(), plan, retrospect),
                new ContentResponse(anotherContent.getCycle(), anotherPlan,
                        anotherRetrospect)
        ));

        assertThat(response).isEqualTo(expected);
    }
}
