package harustudy.backend.content.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.dto.PomodoroContentResponse;
import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressStatusException;
import harustudy.backend.room.domain.CodeGenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.exception.RoomNotFoundException;
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
class PomodoroContentServiceTest {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private PomodoroContentService pomodoroContentService;

    private PomodoroRoom pomodoroRoom;
    private Member member;
    private PomodoroProgress pomodoroProgress;
    private PomodoroContent pomodoroContent;

    @BeforeEach
    void setUp() {
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        pomodoroRoom = new PomodoroRoom("roomName", 1, 20, participantCode);
        member = new Member("nickname", "email", "imageUrl", LoginType.GUEST);
        pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, "nickname");
        pomodoroContent = new PomodoroContent(pomodoroProgress, 1);

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);
        entityManager.persist(pomodoroContent);
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

        pomodoroProgress.proceed();
        entityManager.merge(pomodoroProgress);

        WritePlanRequest request = new WritePlanRequest(pomodoroProgress.getId(),
                Map.of("plan", "abc"));

        // when, then
        assertThatThrownBy(
                () -> pomodoroContentService.writePlan(authMember, pomodoroRoom.getId(), request))
                .isInstanceOf(PomodoroProgressStatusException.class);
    }

    @Test
    void 계획_단계에서는_계획을_작성할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        WritePlanRequest request = new WritePlanRequest(pomodoroProgress.getId(),
                Map.of("plan", "abc"));

        // when, then
        assertThatCode(
                () -> pomodoroContentService.writePlan(authMember, pomodoroRoom.getId(), request))
                .doesNotThrowAnyException();
    }

    @Test
    void 계획이_작성되어_있지_않은_경우_회고를_작성하려_하면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        WriteRetrospectRequest request = new WriteRetrospectRequest(pomodoroProgress.getId(),
                Map.of("retrospect", "abc"));

        // when, then
        assertThatThrownBy(
                () -> pomodoroContentService.writeRetrospect(authMember, pomodoroRoom.getId(),
                        request))
                .isInstanceOf(PomodoroProgressStatusException.class);
    }

    @Test
    void 회고_작성_단계가_아닐_때_회고를_작성하려_하면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        WriteRetrospectRequest request = new WriteRetrospectRequest(pomodoroProgress.getId(),
                Map.of("retrospect", "abc"));

        // when, then
        assertThatThrownBy(
                () -> pomodoroContentService.writeRetrospect(authMember, pomodoroRoom.getId(),
                        request))
                .isInstanceOf(PomodoroProgressStatusException.class);
    }

    @Test
    void 회고_단계에서는_회고를_작성할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        pomodoroContent.changePlan(Map.of("plan", "abc"));

        pomodoroProgress.proceed();
        pomodoroProgress.proceed();

        entityManager.merge(pomodoroProgress);
        entityManager.merge(pomodoroContent);
        FLUSH_AND_CLEAR_CONTEXT();

        WriteRetrospectRequest request = new WriteRetrospectRequest(pomodoroProgress.getId(),
                Map.of("retrospect", "abc"));

        // when, then
        assertThatCode(
                () -> pomodoroContentService.writeRetrospect(authMember, pomodoroRoom.getId(),
                        request))
                .doesNotThrowAnyException();
    }

    @Test
    void 스터디에_참여한_스터디원의_특정_사이클의_콘텐츠를_조회할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());
        Map<String, String> plan = Map.of("plan", "abc");
        Map<String, String> retrospect = Map.of("retrospect", "abc");
        pomodoroContent.changePlan(plan);
        pomodoroContent.changeRetrospect(retrospect);

        entityManager.merge(pomodoroContent);
        FLUSH_AND_CLEAR_CONTEXT();

        // when
        PomodoroContentsResponse pomodoroContentsResponse =
                pomodoroContentService.findContentsWithFilter(authMember, pomodoroRoom.getId(),
                        pomodoroProgress.getId(), 1);
        PomodoroContentResponse expectedPomodoroContentResponse =
                new PomodoroContentResponse(1, plan, retrospect);
        List<PomodoroContentResponse> content = pomodoroContentsResponse.content();

        // then
        assertThat(content).containsExactly(expectedPomodoroContentResponse);
    }

    @Test
    void 스터디에_참여한_스터디원의_모든_사이클의_콘텐츠를_조회할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());

        pomodoroProgress.proceed();
        pomodoroProgress.proceed();
        pomodoroProgress.proceed();
        pomodoroProgress.proceed();

        Map<String, String> plan = Map.of("plan", "abc");
        Map<String, String> retrospect = Map.of("retrospect", "abc");
        pomodoroContent.changePlan(plan);
        pomodoroContent.changeRetrospect(retrospect);

        PomodoroContent anotherPomodoroContent = new PomodoroContent(pomodoroProgress, 2);
        Map<String, String> anotherCyclePlan = Map.of("plan", "abc");
        Map<String, String> anotherCycleRetrospect = Map.of("retrospect", "abc");
        anotherPomodoroContent.changePlan(anotherCyclePlan);
        anotherPomodoroContent.changeRetrospect(anotherCycleRetrospect);

        entityManager.merge(pomodoroProgress);
        entityManager.merge(pomodoroContent);
        entityManager.persist(anotherPomodoroContent);
        FLUSH_AND_CLEAR_CONTEXT();

        // when
        PomodoroContentsResponse pomodoroContentsResponse = pomodoroContentService.findContentsWithFilter(authMember,
                pomodoroRoom.getId(), pomodoroProgress.getId(), null);

        List<PomodoroContentResponse> expectedPomodoroContentResponses = List.of(
                new PomodoroContentResponse(pomodoroContent.getCycle(), plan, retrospect),
                new PomodoroContentResponse(anotherPomodoroContent.getCycle(), anotherCyclePlan,
                        anotherCycleRetrospect)
        );
        List<PomodoroContentResponse> content = pomodoroContentsResponse.content();

        // then
        assertThat(content).isEqualTo(expectedPomodoroContentResponses);
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회시_스터디가_없으면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());

        // when, then
        assertThatThrownBy(
                () -> pomodoroContentService.findContentsWithFilter(authMember, 999L,
                        pomodoroProgress.getId(), null))
                .isInstanceOf(RoomNotFoundException.class);
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회_시_진행도가_없으면_예외를_던진다() {
        // given
        AuthMember authMember = new AuthMember(member.getId());

        // when, then
        assertThatThrownBy(
                () -> pomodoroContentService.findContentsWithFilter(authMember,
                        pomodoroRoom.getId(), 999L, null))
                .isInstanceOf(PomodoroProgressNotFoundException.class);
    }
}
