package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.progress.dto.PomodoroProgressResponse;
import harustudy.backend.room.domain.CodeGenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
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

    private PomodoroRoom pomodoroRoom;
    private PomodoroProgress pomodoroProgress;
    private MemberDto memberDto;

    @BeforeEach
    void setUp() {
        super.setUp();
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        pomodoroRoom = new PomodoroRoom("roomName", 3, 20,
                participantCode);
        memberDto = createMember("member1");
        pomodoroProgress = new PomodoroProgress(pomodoroRoom, memberDto.member(), "nickname");

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);
        entityManager.persist(pomodoroProgress);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void progressId로_진행도를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/progresses/{progressId}", pomodoroRoom.getId(),
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
                                pomodoroRoom.getId(), pomodoroProgress.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isNoContent());

        PomodoroProgress foundProgress = entityManager.find(PomodoroProgress.class,
                pomodoroProgress.getId());
        assertThat(foundProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.STUDYING);
    }
}
