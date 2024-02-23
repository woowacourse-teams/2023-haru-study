package harustudy.backend.content.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.content.domain.Content;
import harustudy.backend.content.dto.ContentResponse;
import harustudy.backend.content.dto.ContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.exception.ParticipantNotFoundException;
import harustudy.backend.participant.exception.StudyStepException;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.testutils.EntityManagerUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class ContentServiceTest {

    @Autowired
    private ContentService contentService;

    @PersistenceContext
    private EntityManager entityManager;

    private Study study;
    private Member member;
    private Member member2;
    private Participant participant;
    private Content content;

    @BeforeEach
    void setUp() {
        study = new Study("studyName", 1, 20);
        member = new Member("nickname", "email", "imageUrl", LoginType.GUEST);
        member2 = new Member("nickname2", "email2", "imageUrl2", LoginType.GUEST);
        participant = Participant.createParticipantOfStudy(study, member, "nickname");
        content = new Content(participant, 1);

        entityManager.persist(study);
        entityManager.persist(member);
        entityManager.persist(member2);
        entityManager.persist(participant);
        entityManager.persist(content);

        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    @Test
    void 계획_단계가_아닐_때_계획을_작성하려_하면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());

        study.proceed();
        study.proceed();

        entityManager.merge(study);
        EntityManagerUtil.flushAndClearContext(entityManager);

        WritePlanRequest request = new WritePlanRequest(participant.getId(),
                Map.of("plan", "abc"));

        // when, then
        assertThatThrownBy(
                () -> contentService.writePlan(authMember, study.getId(), request))
                .isInstanceOf(StudyStepException.class);
    }

    @Test
    void 계획_단계에서는_계획을_작성할_수_있다() {
        // given
        study.proceed();

        entityManager.merge(study);
        EntityManagerUtil.flushAndClearContext(entityManager);

        AuthMember authMember = new AuthMember(member.getId());
        WritePlanRequest request = new WritePlanRequest(participant.getId(),
                Map.of("plan", "abc"));

        // when, then
        assertThatCode(
                () -> contentService.writePlan(authMember, study.getId(), request))
                .doesNotThrowAnyException();
    }

    @Test
    void 계획이_작성되어_있지_않은_경우에도_회고를_작성할_수_있다() {
        // given
        study.proceed();
        study.proceed();
        study.proceed();

        entityManager.merge(study);
        EntityManagerUtil.flushAndClearContext(entityManager);

        AuthMember authMember = new AuthMember(member.getId());
        WriteRetrospectRequest request = new WriteRetrospectRequest(participant.getId(),
                Map.of("retrospect", "abc"));

        // when, then
        assertDoesNotThrow(
                () -> contentService.writeRetrospect(authMember, study.getId(), request)
        );
    }

    @Test
    void 회고_작성_단계가_아닐_때_회고를_작성하려_하면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        WriteRetrospectRequest request = new WriteRetrospectRequest(participant.getId(),
                Map.of("retrospect", "abc"));

        // when, then
        assertThatThrownBy(
                () -> contentService.writeRetrospect(authMember, study.getId(),
                        request))
                .isInstanceOf(StudyStepException.class);
    }

    @Test
    void 회고_단계에서는_회고를_작성할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        content.changePlan(Map.of("plan", "abc"));

        study.proceed();
        study.proceed();
        study.proceed();

        entityManager.merge(content);
        entityManager.merge(study);
        EntityManagerUtil.flushAndClearContext(entityManager);

        WriteRetrospectRequest request = new WriteRetrospectRequest(participant.getId(),
                Map.of("retrospect", "abc"));

        // when, then
        assertThatCode(
                () -> contentService.writeRetrospect(authMember, study.getId(), request))
                .doesNotThrowAnyException();
    }

    @Test
    void 스터디에_참여한_스터디원의_특정_사이클의_콘텐츠를_조회할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        Map<String, String> plan = Map.of("plan", "abc");
        Map<String, String> retrospect = Map.of("retrospect", "abc");
        content.changePlan(plan);
        content.changeRetrospect(retrospect);

        entityManager.merge(content);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when
        ContentsResponse contentsResponse =
                contentService.findContentsWithFilter(authMember, study.getId(),
                        participant.getId(), 1);
        ContentResponse expectedContentResponse =
                new ContentResponse(1, plan, retrospect);
        List<ContentResponse> content = contentsResponse.content();

        // then
        assertThat(content).containsExactly(expectedContentResponse);
    }

    @Test
    void 스터디에_참여한_스터디원의_모든_사이클의_콘텐츠를_조회할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());

        study.proceed();
        study.proceed();
        study.proceed();
        study.proceed();

        Map<String, String> plan = Map.of("plan", "abc");
        Map<String, String> retrospect = Map.of("retrospect", "abc");
        content.changePlan(plan);
        content.changeRetrospect(retrospect);

        Content anotherContent = new Content(participant, 2);
        Map<String, String> anotherCyclePlan = Map.of("plan", "abc");
        Map<String, String> anotherCycleRetrospect = Map.of("retrospect", "abc");
        anotherContent.changePlan(anotherCyclePlan);
        anotherContent.changeRetrospect(anotherCycleRetrospect);

        entityManager.merge(study);
        entityManager.merge(content);
        entityManager.persist(anotherContent);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when
        ContentsResponse contentsResponse = contentService.findContentsWithFilter(authMember,
                study.getId(), participant.getId(), null);

        List<ContentResponse> expectedContentResponses = List.of(
                new ContentResponse(content.getCycle(), plan, retrospect),
                new ContentResponse(anotherContent.getCycle(), anotherCyclePlan,
                        anotherCycleRetrospect)
        );
        List<ContentResponse> content = contentsResponse.content();

        // then
        assertThat(content).isEqualTo(expectedContentResponses);
    }

    @Test
    void 스터디원은_같은_스터디_내_다른_멤버의_콘텐츠를_조회할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        Participant participant2 = Participant.createParticipantOfStudy(study, member2, "nickname2");
        Content contentOfMember2 = new Content(participant2, 1);

        entityManager.persist(participant2);
        entityManager.persist(contentOfMember2);

        EntityManagerUtil.flushAndClearContext(entityManager);

        // when
        ContentsResponse contentsWithFilter = contentService.findContentsWithFilter(authMember,
                study.getId(), participant2.getId(), null);

        // then
        assertThat(contentsWithFilter.content().size()).isEqualTo(1);
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회시_스터디가_없으면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());

        // when, then
        assertThatThrownBy(
                () -> contentService.findContentsWithFilter(authMember, 999L,
                        participant.getId(), null))
                .isInstanceOf(StudyNotFoundException.class);
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회_시_진행도가_없으면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());

        // when, then
        assertThatThrownBy(
                () -> contentService.findContentsWithFilter(authMember,
                        study.getId(), 999L, null))
                .isInstanceOf(ParticipantNotFoundException.class);
    }

    @Test
    void 같은_스터디에_참여하지_않은_멤버가_다른_스터디_멤버의_콘텐츠를_조회하면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member2.getId());

        // when, then
        assertThatThrownBy(() -> contentService.findContentsWithFilter(authMember,
                study.getId(), participant.getId(), null)).isInstanceOf(AuthorizationException.class);
    }
}
