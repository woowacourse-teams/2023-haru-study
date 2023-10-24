package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.member.dto.MemberResponse;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.study.domain.Study;
import java.nio.charset.StandardCharsets;

import harustudy.backend.testutils.EntityManagerUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class MemberIntegrationTest extends IntegrationTest {

    private Study study;
    private MemberDto memberDto1;
    private MemberDto memberDto2;

    @BeforeEach
    void setUp() {
        super.setUp();

        study = new Study("studyName", 1, 20);

        memberDto1 = createMember("member1");
        memberDto2 = createMember("member2");

        Participant participant1 = Participant.of(study, memberDto1.member(),
                "name1");
        Participant participant2 = Participant.of(study, memberDto2.member(),
                "name2");

        entityManager.persist(study);
        entityManager.persist(participant1);
        entityManager.persist(participant2);
        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    @Test
    void 멤버를_조회할_수_있다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(
                        get("/api/v2/me")
                                .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        MemberResponse response = objectMapper.readValue(jsonResponse, MemberResponse.class);

        assertThat(response.memberId()).isEqualTo(memberDto1.member().getId());
    }
}
