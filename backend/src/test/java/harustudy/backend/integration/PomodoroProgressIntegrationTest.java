package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.progress.dto.PomodoroProgressResponseV2;
import harustudy.backend.room.domain.PomodoroRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class PomodoroProgressIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;
    @PersistenceContext
    private EntityManager entityManager;

    @Test
    void studyId와_memberId로_진행도를_조회한다() throws Exception {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 3, 20,
                participantCode);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member);

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/v2/studies/" + pomodoroRoom.getId() + "/progresses")
                                .param("memberId", Long.toString(member.getId()))
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        PomodoroProgressResponseV2 response = objectMapper.readValue(jsonResponse,
                PomodoroProgressResponseV2.class);

        assertSoftly(softly -> {
            softly.assertThat(response.currentCycle()).isEqualTo(1);
            softly.assertThat(response.step())
                    .isEqualTo(PomodoroStatus.PLANNING.toString().toLowerCase());
        });
    }

    @Test
    void studyId와_progressId로_진행도를_진행시킨다() throws Exception {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 3, 20,
                participantCode);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member);

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);

        // when & then
        mockMvc.perform(
                        post("/api/v2/studies/" + pomodoroRoom.getId() + "/progresses/"
                                + pomodoroProgress.getId() + "/next-step")
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        assertThat(pomodoroProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.STUDYING);
    }
}
