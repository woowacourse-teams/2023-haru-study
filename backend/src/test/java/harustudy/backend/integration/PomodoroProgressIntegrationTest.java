package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.progress.dto.PomodoroProgressResponse;
import harustudy.backend.study.domain.PomodoroStudy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroProgressIntegrationTest extends IntegrationTest {

    private PomodoroStudy pomodoroStudy;
    private PomodoroProgress pomodoroProgress;
    private MemberDto memberDto;

    @BeforeEach
    void setUp() {
        super.setUp();
        pomodoroStudy = new PomodoroStudy("studyName", 3, 20);
        memberDto = createMember("member1");
        pomodoroProgress = new PomodoroProgress(pomodoroStudy, memberDto.member(), "nickname");

        entityManager.persist(pomodoroStudy);
        entityManager.persist(pomodoroProgress);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void progressId로_진행도를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/progresses/{progressId}", pomodoroStudy.getId(),
                                pomodoroProgress.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        PomodoroProgressResponse response = objectMapper.readValue(jsonResponse,
                PomodoroProgressResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.currentCycle()).isEqualTo(1);
            softly.assertThat(response.step())
                    .isEqualTo(PomodoroStatus.PLANNING.toString().toLowerCase());
        });
    }

    @Test
    void studyId와_progressId로_진행도를_진행시킨다() throws Exception {
        // when, then
        mockMvc.perform(
                        post("/api/studies/{studyId}/progresses/{progressId}/next-step",
                                pomodoroStudy.getId(), pomodoroProgress.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isNoContent());

        PomodoroProgress foundProgress = entityManager.find(PomodoroProgress.class,
                pomodoroProgress.getId());
        assertThat(foundProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.STUDYING);
    }
}
