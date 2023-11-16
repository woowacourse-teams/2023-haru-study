package harustudy.backend.content.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.content.domain.Content;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.study.domain.Study;

import java.util.Map;

import harustudy.backend.testutils.EntityManagerUtils;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest
class ContentRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private ContentRepository contentRepository;

    private Participant participant;

    @BeforeEach
    void setUp() {
        Study study = new Study("studyName", 3, 20);
        Member member = new Member("member", "email", "imageUrl", LoginType.GUEST);
        participant = Participant.createParticipantOfStudy(study, member, "nickname");

        entityManager.persist(study);
        entityManager.persist(member);
        entityManager.persist(participant);

        EntityManagerUtils.flushAndClearContext(entityManager);
    }

    @Test
    void 스터디_계획을_저장할_수_있다() {
        // given
        Map<String, String> plan = Map.of("completionCondition", "완료조건", "expectedProbability",
                "80%");
        Content content = new Content(participant, 1);
        content.changePlan(plan);
        entityManager.persist(content);

        EntityManagerUtils.flushAndClearContext(entityManager);

        // when
        Content found = contentRepository.findById(content.getId())
                .orElseThrow();

        // then
        assertThat(found.getPlan()).containsAllEntriesOf(plan);
        assertThat(found.getRetrospect()).isEmpty();
    }

    @Test
    void 스터디_회고를_작성할_수_있다() {
        // given
        Map<String, String> plan = Map.of("completionCondition", "완료조건",
                "expectedProbability", "80%");
        Map<String, String> retrospect = Map.of("doneAsExpected", "예상했던 결과",
                "experiencedDifficulty", "겪었던 어려움");
        Content content = new Content(participant, 1);
        content.changePlan(plan);
        content.changeRetrospect(retrospect);
        entityManager.persist(content);

        EntityManagerUtils.flushAndClearContext(entityManager);

        // when
        Content found = contentRepository.findById(content.getId())
                .orElseThrow();

        // then
        assertThat(found.getPlan()).containsAllEntriesOf(plan);
        assertThat(found.getRetrospect()).containsAllEntriesOf(retrospect);
    }
}
