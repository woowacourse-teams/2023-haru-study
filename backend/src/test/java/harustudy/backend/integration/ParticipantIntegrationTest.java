package harustudy.backend.integration;

import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.study.domain.Study;
import harustudy.backend.testutils.EntityManagerUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        participant = Participant.createParticipantOfStudy(study, memberDto.member(), "nickname");

        entityManager.persist(study);
        entityManager.persist(participant);
        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    @Test
    void participantId로_참여자를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(
                        get("/api/v2/studies/{studyId}/participants/{participantId}", study.getId(),
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
                    softly.assertThat(response.participantId()).isEqualTo(participant.getId());
                    softly.assertThat(response.nickname()).isEqualTo(participant.getNickname());
                }
        );
    }
}
