package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.entity.Member;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.PomodoroRecord;
import harustudy.backend.entity.Study;
import harustudy.backend.entity.StudyStatus;
import harustudy.backend.entity.TemplateVersion;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

public class ProceedPomodoroStudyIntegrationTest extends IntegrationTest {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 스터디의_상태를_진행에서_회고_단계로_변경할_수_있다() throws Exception {
        // given
        Study study = new Pomodoro("studyName", 1, 20);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member, 1,
                StudyStatus.STUDYING);
        entityManager.persist(study);
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);

        // when, then
        mockMvc.perform(
                        post("/api/studies/{studyId}/members/{memberId}/next-step",
                                study.getId(), member.getId()))
                .andExpect(status().isOk());
    }

    @Test
    void 사용자는_회고를_작성할_수_있다() throws Exception {
        // given
        Study study = new Pomodoro("studyName", 1, 20);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member, 1,
                StudyStatus.RETROSPECT);
        PomodoroRecord pomodoroRecord = new PomodoroRecord(pomodoroProgress, 1,
                Map.of("plan", "test"),
                Map.of(), TemplateVersion.V1);

        entityManager.persist(study);
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);
        entityManager.persist(pomodoroRecord);

        // when
        Map<String, String> retrospect = Map.of("retrospect", "test");
        String jsonRequest = objectMapper.writeValueAsString(retrospect);

        // then
        mockMvc.perform(post("/api/studies/{studyId}/members/{memberId}/content/plans",
                study.getId(), member.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonRequest))

                .andExpect(status().isCreated());

        PomodoroRecord savedPomodoroRecord = entityManager.find(PomodoroRecord.class,
                pomodoroRecord.getId());
        assertThat(savedPomodoroRecord.getRetrospect()).containsAllEntriesOf(retrospect);
    }
}
