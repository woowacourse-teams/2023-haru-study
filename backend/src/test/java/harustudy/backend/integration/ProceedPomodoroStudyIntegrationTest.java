package harustudy.backend.integration;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.Study;
import harustudy.backend.entity.StudyStatus;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.Test;

public class ProceedPomodoroStudyIntegrationTest extends IntegrationTest {

    @PersistenceContext
    private EntityManager entityManager;

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

        System.out.println(study.getId());
        System.out.println(member.getId());
        // when
        mockMvc.perform(
                post("/api/studies/{studyId}/members/{memberId}/next-step",
                        study.getId(), member.getId()))
                .andExpect(status().isOk());
    }
}
