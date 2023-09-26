package harustudy.backend.integration;

import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.study.domain.Study;
import harustudy.backend.polling.dto.WaitingResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PollingIntegrationTest extends IntegrationTest {

    private Study study;
    private MemberDto memberDto1;
    private MemberDto memberDto2;
    private MemberDto memberDto3;
    private Participant participant1;
    private Participant participant2;
    private Participant participant3;

    @BeforeEach
    void setUp() {
        super.setUp();
        study = new Study("studyName", 3, 20);
        memberDto1 = createMember("member1");
        memberDto2 = createMember("member2");
        memberDto3 = createMember("member3");
        participant1 = Participant.instantiateParticipantWithContents(study, memberDto1.member(), "parti1");
        participant2 = Participant.instantiateParticipantWithContents(study, memberDto2.member(), "parti2");
        participant3 = Participant.instantiateParticipantWithContents(study, memberDto3.member(), "parti3");

        entityManager.persist(study);
        entityManager.persist(participant1);
        entityManager.persist(participant2);
        entityManager.persist(participant3);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 스터디에_참여한_참여자들을_폴링으로_조회한다() throws Exception {
        // given, when
        MvcResult mvcResult = mockMvc.perform(get("/api/waiting")
                        .param("studyId", String.valueOf(study.getId()))
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        List<ParticipantResponse> expected = Stream.of(participant1, participant2, participant3)
                .map(ParticipantResponse::from)
                .toList();

        // then
        String jsonResponse = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        System.out.println("jsonResponse = " + jsonResponse);
        WaitingResponse waitingResponse = objectMapper.readValue(jsonResponse, WaitingResponse.class);


        assertSoftly(softly -> {
            softly.assertThat(waitingResponse.studyStep()).isEqualTo(study.getStep().name().toLowerCase());
            softly.assertThat(waitingResponse.participants().size()).isEqualTo(3);
            softly.assertThat(waitingResponse.participants()).containsExactlyInAnyOrderElementsOf(expected);
        });
    }
}
