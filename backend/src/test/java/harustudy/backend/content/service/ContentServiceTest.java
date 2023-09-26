package harustudy.backend.content.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.auth.dto.AuthMember;
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

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private ContentService contentService;

    private Study study;
    private Member member;
    private Participant participant;
    private Content content;

    @BeforeEach
    void setUp() {
        study = new Study("studyName", 1, 20);
        member = new Member("nickname", "email", "imageUrl", LoginType.GUEST);
        participant = Participant.instantiateParticipantWithContents(study, member, "nickname");
        content = participant.getContents().get(0);

        entityManager.persist(study);
        entityManager.persist(member);
        entityManager.persist(participant);
        entityManager.persist(content);
        FLUSH_AND_CLEAR_CONTEXT();
    }

    void FLUSH_AND_CLEAR_CONTEXT() {
        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 계획_단계가_아닐_때_계획을_작성하려_하면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());

        study.proceed();
        study.proceed();
        entityManager.merge(study);

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
        AuthMember authMember = new AuthMember(member.getId());
        WritePlanRequest request = new WritePlanRequest(participant.getId(),
                Map.of("plan", "abc"));

        // when, then
        assertThatCode(
                () -> contentService.writePlan(authMember, study.getId(), request))
                .doesNotThrowAnyException();
    }

    @Test
    void 계획이_작성되어_있지_않은_경우_회고를_작성하려_하면_예외를_던진다() {
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
        FLUSH_AND_CLEAR_CONTEXT();

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
        FLUSH_AND_CLEAR_CONTEXT();

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
        FLUSH_AND_CLEAR_CONTEXT();

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
}
