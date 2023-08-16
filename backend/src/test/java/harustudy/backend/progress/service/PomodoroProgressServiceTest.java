package harustudy.backend.progress.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.progress.dto.ParticipateStudyRequest;
import harustudy.backend.progress.dto.PomodoroProgressResponse;
import harustudy.backend.progress.dto.PomodoroProgressesResponse;
import harustudy.backend.room.domain.CodeGenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Transactional
public class PomodoroProgressServiceTest {

    @Autowired
    private PomodoroProgressService pomodoroProgressService;

    @PersistenceContext
    private EntityManager entityManager;

    private PomodoroRoom pomodoroRoom;
    private Member member1;
    private Member member2;

    @BeforeEach
    void setUp() {
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        pomodoroRoom = new PomodoroRoom("roomName", 3, 20, participantCode);
        member1 = Member.guest();
        member2 = Member.guest();

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);
        entityManager.persist(member1);
        entityManager.persist(member2);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 진행도를_조회할_수_있다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member1, "nickname1");
        AuthMember authMember = new AuthMember(member1.getId());

        entityManager.persist(pomodoroProgress);

        // when
        PomodoroProgressResponse response =
                pomodoroProgressService.findPomodoroProgress(authMember, pomodoroRoom.getId(), pomodoroProgress.getId());
        PomodoroProgressResponse expected = PomodoroProgressResponse.from(pomodoroProgress);

        // then
        assertThat(response).usingRecursiveComparison()
                .ignoringExpectedNullFields()
                .isEqualTo(expected);
    }

    @Test
    void 스터디의_모든_진행도를_조회할_수_있다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member1, "nickname1");
        PomodoroProgress anotherPomodoroProgress = new PomodoroProgress(pomodoroRoom, member2, "nickname2");
        AuthMember authMember1 = new AuthMember(member1.getId());

        entityManager.persist(pomodoroProgress);
        entityManager.persist(anotherPomodoroProgress);

        // when
        PomodoroProgressesResponse response =
                pomodoroProgressService.findPomodoroProgressWithFilter(authMember1, pomodoroRoom.getId(), null);
        PomodoroProgressesResponse expected = PomodoroProgressesResponse.from(List.of(
                PomodoroProgressResponse.from(pomodoroProgress),
                PomodoroProgressResponse.from(anotherPomodoroProgress)
        ));

        // then
        assertThat(response).usingRecursiveComparison()
                .ignoringExpectedNullFields()
                .isEqualTo(expected);
    }

    @Test
    void 특정_멤버의_진행도를_조회할_수_있다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member1, "nickname1");
        PomodoroProgress anotherPomodoroProgress = new PomodoroProgress(pomodoroRoom, member2, "nickname2");
        AuthMember authMember1 = new AuthMember(member1.getId());

        entityManager.persist(pomodoroProgress);
        entityManager.persist(anotherPomodoroProgress);

        // when
        PomodoroProgressesResponse response =
                pomodoroProgressService.findPomodoroProgressWithFilter(authMember1, pomodoroRoom.getId(), member1.getId());
        PomodoroProgressesResponse expected = PomodoroProgressesResponse.from(List.of(
                PomodoroProgressResponse.from(pomodoroProgress)
        ));

        // then
        assertThat(response).usingRecursiveComparison()
                .ignoringExpectedNullFields()
                .isEqualTo(expected);
    }

    @Test
    void 다음_스터디_단계로_이동할_수_있다() {
        // given
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member1, "nickname1");
        AuthMember authMember1 = new AuthMember(member1.getId());

        entityManager.persist(pomodoroProgress);

        // when
        pomodoroProgressService.proceed(authMember1, pomodoroRoom.getId(), pomodoroProgress.getId());

        // then
        assertThat(pomodoroProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.STUDYING);
    }

    @Test
    void 스터디에_참여하면_진행도가_생긴다() {
        // given
        AuthMember authMember1 = new AuthMember(member1.getId());

        // when
        ParticipateStudyRequest request = new ParticipateStudyRequest(member1.getId(), "nick");
        Long progressId = pomodoroProgressService.participateStudy(authMember1, pomodoroRoom.getId(), request);

        // then
        PomodoroProgress pomodoroProgress = entityManager.find(PomodoroProgress.class, progressId);
        assertSoftly(softly -> {
            assertThat(pomodoroProgress.getNickname()).isEqualTo(request.nickname());
            assertThat(pomodoroProgress.getMember().getId()).isEqualTo(request.memberId());
            assertThat(pomodoroProgress.getCurrentCycle()).isEqualTo(1);
            assertThat(pomodoroProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.PLANNING);
        });
    }
}
