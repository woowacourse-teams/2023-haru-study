package harustudy.backend.content.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.domain.TemplateVersion;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.MemberProgress;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.Room;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest
class MemberContentRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;
    @Autowired
    private ContentRepository<PomodoroContent> contentRepository;

    // TODO: 테스트 메소드 중복 제거
    @Test
    void 특정_멤버의_스터디_계획을_작성할_수_있다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        Room room = new PomodoroRoom("studyName", 3, 20, participantCode);
        Member member = new Member("member");
        MemberProgress memberProgress = new PomodoroProgress(room, member, 1,
                PomodoroStatus.STUDYING);
        Map<String, String> plan = Map.of("completionCondition", "완료조건",
                "expectedProbability", "80%");
        PomodoroContent pomodoroRecord = new PomodoroContent(memberProgress, 1, plan, Map.of(),
                TemplateVersion.V1);

        // when
        testEntityManager.persist(participantCode);
        testEntityManager.persist(room);
        testEntityManager.persist(member);
        testEntityManager.persist(memberProgress);
        testEntityManager.persist(pomodoroRecord);

        testEntityManager.flush();
        testEntityManager.clear();

        List<PomodoroContent> found = contentRepository.findByMemberProgress(
                memberProgress);

        // then
        assertThat(found.get(0).getPlan()).containsAllEntriesOf(plan);
        assertThat(found.get(0).getRetrospect()).isEmpty();
    }

    @Test
    void 특정_멤버의_스터디_회고를_작성할_수_있다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        Room room = new PomodoroRoom("studyName", 3, 20, participantCode);
        Member member = new Member("member");
        MemberProgress memberProgress = new PomodoroProgress(room, member, 1,
                PomodoroStatus.STUDYING);
        Map<String, String> plan = Map.of("completionCondition", "완료조건",
                "expectedProbability", "80%");
        PomodoroContent pomodoroRecord = new PomodoroContent(memberProgress, 1, plan, Map.of(),
                TemplateVersion.V1);

        testEntityManager.persist(participantCode);
        testEntityManager.persist(room);
        testEntityManager.persist(member);
        testEntityManager.persist(memberProgress);
        testEntityManager.persist(pomodoroRecord);

        testEntityManager.flush();
        testEntityManager.clear();

        List<PomodoroContent> found = contentRepository.findByMemberProgress(
                memberProgress);

        // when
        Map<String, String> retrospect = Map.of("doneAsExpeceted", "예상했던 결과",
                "experiencedDifficulty", "겪었던 어려움");
        found.get(0).changeRetrospect(retrospect);

        testEntityManager.flush();
        testEntityManager.clear();

        // then
        List<PomodoroContent> changed = contentRepository.findByMemberProgress(
                memberProgress);

        assertThat(changed.get(0).getPlan()).containsAllEntriesOf(plan);
        assertThat(changed.get(0).getRetrospect()).containsAllEntriesOf(retrospect);
    }
}
