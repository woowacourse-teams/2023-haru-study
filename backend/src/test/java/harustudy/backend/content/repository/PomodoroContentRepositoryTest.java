package harustudy.backend.content.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.room.domain.PomodoroRoom;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest
class PomodoroContentRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;
    @Autowired
    private PomodoroContentRepository pomodoroContentRepository;

    private PomodoroProgress pomodoroProgress;

    @BeforeEach
    void setup() {
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 3, 20, participantCode);
        Member member = new Member("member");
        pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, 1, PomodoroStatus.STUDYING);

        testEntityManager.persist(participantCode);
        testEntityManager.persist(pomodoroRoom);
        testEntityManager.persist(member);
        testEntityManager.persist(pomodoroProgress);
    }

    @Test
    void 스터디_계획을_저장할_수_있다() {
        // given
        Map<String, String> plan = Map.of("completionCondition", "완료조건", "expectedProbability", "80%");
        PomodoroContent pomodoroContent = new PomodoroContent(pomodoroProgress, 1);
        pomodoroContent.changePlan(plan);

        // when
        testEntityManager.persist(pomodoroContent);

        testEntityManager.flush();
        testEntityManager.clear();

        List<PomodoroContent> found = pomodoroContentRepository.findByPomodoroProgress(pomodoroProgress);

        // then
        assertThat(found.get(0).getPlan()).containsAllEntriesOf(plan);
        assertThat(found.get(0).getRetrospect()).isEmpty();
    }

    @Test
    void 스터디_회고를_작성할_수_있다() {
        // given
        Map<String, String> plan = Map.of("completionCondition", "완료조건",
                "expectedProbability", "80%");
        Map<String, String> retrospect = Map.of("doneAsExpected", "예상했던 결과",
                "experiencedDifficulty", "겪었던 어려움");
        PomodoroContent pomodoroContent = new PomodoroContent(pomodoroProgress, 1);
        pomodoroContent.changePlan(plan);
        pomodoroContent.changeRetrospect(retrospect);

        // when
        testEntityManager.persist(pomodoroContent);

        testEntityManager.flush();
        testEntityManager.clear();

        List<PomodoroContent> found = pomodoroContentRepository.findByPomodoroProgress(pomodoroProgress);
        // then

        assertThat(found.get(0).getPlan()).containsAllEntriesOf(plan);
        assertThat(found.get(0).getRetrospect()).containsAllEntriesOf(retrospect);
    }
}
