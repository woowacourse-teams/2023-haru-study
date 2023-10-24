package harustudy.backend.polling.service;

import harustudy.backend.content.domain.Content;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.study.domain.Study;
import harustudy.backend.polling.dto.SubmitterResponse;
import harustudy.backend.polling.dto.SubmittersResponse;
import harustudy.backend.polling.dto.WaitingResponse;
import harustudy.backend.polling.exception.CannotSeeSubmittersException;
import harustudy.backend.testutils.EntityManagerUtil;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
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

    private Member member1;
    private Member member2;
    private Member member3;
    private Participant participant1;
    private Participant participant2;
    private Participant participant3;
    private Study study;
    private Content content1;
    private Content content2;
    private Content content3;

    @BeforeEach
    void setUp() {
        study = new Study("studyName", 1, 20);

        member1 = new Member("member1", "email", "url", LoginType.GUEST);
        member2 = new Member("member2", "email", "url", LoginType.GUEST);
        member3 = new Member("member3", "email", "url", LoginType.GUEST);

        participant1 = Participant.of(study, member1, "parti1");
        participant2 = Participant.of(study, member2, "parti2");
        participant3 = Participant.of(study, member3, "parti3");

        content1 = new Content(participant1, 1);
        content2 = new Content(participant2, 1);
        content3 = new Content(participant3, 1);

        entityManager.persist(study);
        entityManager.persist(member1);
        entityManager.persist(member2);
        entityManager.persist(member3);
        entityManager.persist(participant1);
        entityManager.persist(participant2);
        entityManager.persist(participant3);
        entityManager.persist(content1);
        entityManager.persist(content2);
        entityManager.persist(content3);
        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    @Test
    void 대기_상태에서_제출_인원을_확인하려_하면_예외가_발생한다() {
        // given, when, then
        assertThatThrownBy(() -> pollingService.findSubmitters(study.getId()))
                .isInstanceOf(CannotSeeSubmittersException.class);
    }

    @Test
    void 계획_단계에서는_제출_인원을_확인할_수_있다() {
        // given
        study.proceed();
        content1.changePlan(Map.of("content", "written"));

        entityManager.merge(study);
        entityManager.merge(content1);
        EntityManagerUtil.flushAndClearContext(entityManager);

        SubmittersResponse expected = new SubmittersResponse(List.of(
                new SubmitterResponse("parti1", true),
                new SubmitterResponse("parti2", false),
                new SubmitterResponse("parti3", false)
        ));

        // when
        SubmittersResponse submitters = pollingService.findSubmitters(study.getId());

        // then
        assertThat(submitters).usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    void 회고_단계에서는_제출_인원을_확인할_수_있다() {
        study.proceed();
        study.proceed();
        study.proceed();
        content1.changeRetrospect(Map.of("content", "written"));
        content2.changeRetrospect(Map.of("content", "written"));

        entityManager.merge(study);
        entityManager.merge(content1);
        entityManager.merge(content2);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when
        SubmittersResponse submitters = pollingService.findSubmitters(study.getId());

        // then
        SubmittersResponse expected = new SubmittersResponse(List.of(
                new SubmitterResponse("parti1", true),
                new SubmitterResponse("parti2", true),
                new SubmitterResponse("parti3", false)
        ));

        assertThat(submitters).usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    void 스터디가_종료한_뒤에는_제출_인원을_확인하려_하면_예외가_발생한다() {
        // given
        study.proceed();
        study.proceed();
        study.proceed();
        study.proceed();

        entityManager.merge(study);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when, then
        assertThatThrownBy(() -> pollingService.findSubmitters(study.getId()))
                .isInstanceOf(CannotSeeSubmittersException.class);
    }

    @Test
    void 스터디에_참여한_참여자들을_조회한다() {
        // given, when
        WaitingResponse response = pollingService.pollWaiting(study.getId());

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

    @Test
    void 대기방에서_방장이_나가면_참여자가_없는_것으로_반환된다() {
        // given
        Participant participant = entityManager.merge(participant1);
        Content content = entityManager.merge(content1);
        entityManager.remove(participant);
        entityManager.remove(content);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when
        WaitingResponse response = pollingService.pollWaiting(study.getId());

        // then
        assertThat(response.participants()).hasSize(0);
    }
}
