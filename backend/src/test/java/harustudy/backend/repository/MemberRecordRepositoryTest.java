package harustudy.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.entity.CodeGenerationStrategy;
import harustudy.backend.entity.Member;
import harustudy.backend.entity.MemberProgress;
import harustudy.backend.entity.ParticipantCode;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.PomodoroRecord;
import harustudy.backend.entity.Study;
import harustudy.backend.entity.StudyStatus;
import harustudy.backend.entity.TemplateVersion;
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
class MemberRecordRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;
    @Autowired
    private MemberRecordRepository<PomodoroRecord> memberRecordRepository;

    // TODO: 테스트 메소드 중복 제거
    @Test
    void 특정_멤버의_스터디_계획을_작성할_수_있다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        Study study = new Pomodoro("studyName", 3, 20, participantCode);
        Member member = new Member("member");
        MemberProgress memberProgress = new PomodoroProgress(study, member, 1,
                StudyStatus.STUDYING);
        Map<String, String> plan = Map.of("completionCondition", "완료조건",
                "expectedProbability", "80%");
        PomodoroRecord pomodoroRecord = new PomodoroRecord(memberProgress, 1, plan, Map.of(),
                TemplateVersion.V1);

        // when
        testEntityManager.persist(participantCode);
        testEntityManager.persist(study);
        testEntityManager.persist(member);
        testEntityManager.persist(memberProgress);
        testEntityManager.persist(pomodoroRecord);

        testEntityManager.flush();
        testEntityManager.clear();

        List<PomodoroRecord> found = memberRecordRepository.findByMemberProgress(
                memberProgress);

        // then
        assertThat(found.get(0).getPlan()).containsAllEntriesOf(plan);
        assertThat(found.get(0).getRetrospect()).isEmpty();
    }

    @Test
    void 특정_멤버의_스터디_회고를_작성할_수_있다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        Study study = new Pomodoro("studyName", 3, 20, participantCode);
        Member member = new Member("member");
        MemberProgress memberProgress = new PomodoroProgress(study, member, 1,
                StudyStatus.STUDYING);
        Map<String, String> plan = Map.of("completionCondition", "완료조건",
                "expectedProbability", "80%");
        PomodoroRecord pomodoroRecord = new PomodoroRecord(memberProgress, 1, plan, Map.of(),
                TemplateVersion.V1);

        testEntityManager.persist(participantCode);
        testEntityManager.persist(study);
        testEntityManager.persist(member);
        testEntityManager.persist(memberProgress);
        testEntityManager.persist(pomodoroRecord);

        testEntityManager.flush();
        testEntityManager.clear();

        List<PomodoroRecord> found = memberRecordRepository.findByMemberProgress(
                memberProgress);

        // when
        Map<String, String> retrospect = Map.of("doneAsExpeceted", "예상했던 결과",
                "experiencedDifficulty", "겪었던 어려움");
        found.get(0).changeRetrospect(retrospect);

        testEntityManager.flush();
        testEntityManager.clear();

        // then
        List<PomodoroRecord> changed = memberRecordRepository.findByMemberProgress(
                memberProgress);

        assertThat(changed.get(0).getPlan()).containsAllEntriesOf(plan);
        assertThat(changed.get(0).getRetrospect()).containsAllEntriesOf(retrospect);
    }
}
