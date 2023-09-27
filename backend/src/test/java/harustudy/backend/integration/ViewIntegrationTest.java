package harustudy.backend.integration;

import static harustudy.backend.testutils.EntityManagerUtil.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.study.domain.Study;
import harustudy.backend.polling.dto.ProgressResponse;
import java.nio.charset.StandardCharsets;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class ViewIntegrationTest extends IntegrationTest {

    private Study study;
    private MemberDto member1;
    private MemberDto member2;

    @BeforeEach
    void setUp() {
        super.setUp();

        study = new Study("studyName", 1, 20);

        member1 = createMember("member1");
        member2 = createMember("member2");

        Participant participant1 = Participant.instantiateParticipantWithContents(study, member1.member(), "nickname1");
        Participant participant2 = Participant.instantiateParticipantWithContents(study, member2.member(), "nickname2");

        entityManager.persist(study);
        entityManager.persist(participant1);
        entityManager.persist(participant2);
        FLUSH_AND_CLEAR_CONTEXT(entityManager);
    }

    @ParameterizedTest
    @MethodSource("progressPollingParameters")
    void 스터디_아이디로_진행_페이지_폴링을_진행할_수_있다(int progressCount, String expected) throws Exception {
        //given
        for (int i = 0; i < progressCount; i++) {
            스터디_진행();
        }

        //when
        MvcResult result = mockMvc.perform(
                        get("/api/progress")
                                .header(HttpHeaders.AUTHORIZATION, member1.createAuthorizationHeader())
                                .param("studyId", String.valueOf(study.getId())))
                .andExpect(status().isOk())
                .andReturn();

        //then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        ProgressResponse response = objectMapper.readValue(jsonResponse,
                ProgressResponse.class);

        assertThat(response.progressStep()).isEqualTo(expected);
    }

    void 스터디_진행() throws Exception {
        mockMvc.perform(
                        post("/api/studies/{studyId}/next-step", study.getId())
                                .header(HttpHeaders.AUTHORIZATION, member1.createAuthorizationHeader()))
                .andExpect(status().isNoContent());
    }

    private static Stream<Arguments> progressPollingParameters() {
        return Stream.of(
                Arguments.of(1, Step.PLANNING.name().toLowerCase()),
                Arguments.of(2, Step.STUDYING.name().toLowerCase()),
                Arguments.of(3, Step.RETROSPECT.name().toLowerCase())
        );
    }
}
