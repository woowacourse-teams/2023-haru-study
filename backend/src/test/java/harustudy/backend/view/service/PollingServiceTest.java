package harustudy.backend.view.service;

import harustudy.backend.content.domain.Content;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.study.domain.Study;
import harustudy.backend.view.dto.SubmitterResponse;
import harustudy.backend.view.dto.SubmittersResponse;
import harustudy.backend.view.exception.SubmitNotAllowedStepException;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class PollingServiceTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private PollingService pollingService;

    private Study study;
    private Content content1;
    private Content content2;

    @BeforeEach
    void setUp() {
        study = new Study("study", 1, 20);
        Member member1 = new Member("name1", "email", "imageUrl", LoginType.GUEST);
        Member member2 = new Member("name2", "email", "imageUrl", LoginType.GUEST);
        Participant participant1 = new Participant(study, member1, "nickname1");
        Participant participant2 = new Participant(study, member2, "nickname2");
        content1 = new Content(participant1, 1);
        content2 = new Content(participant2, 1);

        entityManager.persist(study);
        entityManager.persist(member1);
        entityManager.persist(member2);
        entityManager.persist(participant1);
        entityManager.persist(participant2);
        entityManager.persist(content1);
        entityManager.persist(content2);
    }

    @Test
    void 대기_상태에서_제출_인원을_확인하려_하면_예외가_발생한다() {
        // given, when, then
        entityManager.flush();
        entityManager.clear();

        assertThatThrownBy(() -> pollingService.findSubmitters(study.getId()))
                .isInstanceOf(SubmitNotAllowedStepException.class);
    }

    @Test
    void 계획_단계에서는_제출_인원을_확인할_수_있다() {
        study.proceed();
        content1.changePlan(Map.of("content", "written"));

        entityManager.flush();
        entityManager.clear();

        // when
        SubmittersResponse submitters = pollingService.findSubmitters(study.getId());

        // then
        SubmittersResponse expected = new SubmittersResponse(List.of(
                new SubmitterResponse("nickname1", true),
                new SubmitterResponse("nickname2", false)
        ));

        assertThat(submitters).usingRecursiveComparison()
                .isEqualTo(expected);
    }

    @Test
    void 진행_단계에서는_제출_인원을_확인하려_하면_예외가_발생한다() {
        // given
        study.proceed();
        study.proceed();

        entityManager.flush();
        entityManager.clear();

        // when, then
        assertThatThrownBy(() -> pollingService.findSubmitters(study.getId()))
                .isInstanceOf(SubmitNotAllowedStepException.class);
    }

    @Test
    void 회고_단계에서는_제출_인원을_확인할_수_있다() {
        study.proceed();
        study.proceed();
        study.proceed();
        content1.changeRetrospect(Map.of("content", "written"));
        content2.changeRetrospect(Map.of("content", "written"));

        entityManager.flush();
        entityManager.clear();

        // when
        SubmittersResponse submitters = pollingService.findSubmitters(study.getId());

        // then
        SubmittersResponse expected = new SubmittersResponse(List.of(
                new SubmitterResponse("nickname1", true),
                new SubmitterResponse("nickname2", true)
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

        entityManager.flush();
        entityManager.clear();

        // when, then
        assertThatThrownBy(() -> pollingService.findSubmitters(study.getId()))
                .isInstanceOf(SubmitNotAllowedStepException.class);
    }
}
