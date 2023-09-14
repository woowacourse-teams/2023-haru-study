package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.study.domain.Study;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class ParticipantIntegrationTest extends IntegrationTest {

    private Study study;
    private Participant participant;
    private MemberDto memberDto;

    @BeforeEach
    void setUp() {
        super.setUp();
        study = new Study("studyName", 3, 20);
        memberDto = createMember("member1");
        participant = new Participant(study, memberDto.member(), "nickname");

        entityManager.persist(study);
        entityManager.persist(participant);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void participantId로_진행도를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/participants/{participantId}", study.getId(),
                                participant.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        ParticipantResponse response = objectMapper.readValue(jsonResponse,
                ParticipantResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.currentCycle()).isEqualTo(1);
            softly.assertThat(response.step())
                    .isEqualTo(Step.PLANNING.toString().toLowerCase());
        });
    }

    @Test
    void studyId와_participantId로_진행도를_진행시킨다() throws Exception {
        // when, then
        mockMvc.perform(
                        post("/api/studies/{studyId}/participants/{participantId}/next-step",
                                study.getId(), participant.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isNoContent());

        Participant foundParticipant = entityManager.find(Participant.class,
                participant.getId());
        assertThat(foundParticipant.getStep()).isEqualTo(Step.STUDYING);
    }
}
