package harustudy.backend.view.service;

import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.study.domain.Study;
import harustudy.backend.view.dto.WaitingResponse;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class PollingServiceTest {

    @Autowired
    private PollingService pollingService;

    @Autowired
    private EntityManager entityManager;

    private Study study;
    private Member member1;
    private Member member2;
    private Member member3;
    private Participant participant1;
    private Participant participant2;
    private Participant participant3;

    @BeforeEach
    void setUp() {
        study = new Study("studyName", 3, 20);

        member1 = new Member("member1", "email", "url", LoginType.GUEST);
        member2 = new Member("member2", "email", "url", LoginType.GUEST);
        member3 = new Member("member3", "email", "url", LoginType.GUEST);

        participant1 = new Participant(study, member1, "parti1");
        participant2 = new Participant(study, member2, "parti2");
        participant3 = new Participant(study, member3, "parti3");

        entityManager.persist(study);
        entityManager.persist(member1);
        entityManager.persist(member2);
        entityManager.persist(member3);
        entityManager.persist(participant1);
        entityManager.persist(participant2);
        entityManager.persist(participant3);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 스터디에_참여한_참여자들을_폴링으로_조회한다() {
        // given, when
        WaitingResponse response = pollingService.waiting(study.getId());

        // then
        List<ParticipantResponse> expected = Stream.of(participant1, participant2, participant3)
                .map(ParticipantResponse::from)
                .toList();

        assertSoftly(softly -> {
            softly.assertThat(response.studyStep()).isEqualTo(study.getStep().name().toLowerCase());
            softly.assertThat(response.participants().size()).isEqualTo(3);
            softly.assertThat(response.participants()).containsExactlyInAnyOrderElementsOf(expected);
        });
    }
}
