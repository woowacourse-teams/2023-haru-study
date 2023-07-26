package harustudy.backend.integration;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.domain.TemplateVersion;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.Room;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class IntegrationTest {

    protected MockMvc mockMvc;
    protected ParticipantCode participantCode;
    protected Room room;
    protected Member member;
    protected PomodoroProgress pomodoroProgress;
    protected PomodoroContent pomodoroContent;
    protected Map<String, String> plan;
    protected Map<String, String> retrospect;
    @Autowired
    private WebApplicationContext webApplicationContext;
    @PersistenceContext
    private EntityManager entityManager;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        plan = Map.of(
                "toDo", "쿠키와 세션",
                "completionCondition", "완료조건",
                "expectedProbability", "80%",
                "expectedDifficulty", "예상되는 어려움",
                "whatCanYouDo", "가능성을 높이기 위해 무엇을 할 수 있을지?");

        retrospect = Map.of(
                "doneAsExpected", "예상했던 결과",
                "experiencedDifficulty", "겪었던 어려움",
                "lesson", "교훈");

        participantCode = new ParticipantCode(new CodeGenerationStrategy());
        room = new PomodoroRoom("room", 3, 20, participantCode);
        member = new Member("name");
        pomodoroProgress = new PomodoroProgress(room, member);
        pomodoroContent = new PomodoroContent(pomodoroProgress, 1, plan,
                retrospect, TemplateVersion.V1);

        entityManager.persist(participantCode);
        entityManager.persist(room);
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);
        entityManager.persist(pomodoroContent);

        entityManager.flush();
        entityManager.clear();
    }
}
