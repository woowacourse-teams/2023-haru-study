package harustudy.backend.progress.service;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.progress.dto.PomodoroProgressResponseV2;
import harustudy.backend.room.domain.PomodoroRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Transactional
class PomodoroProgressServiceV2Test {

    @Autowired
    private PomodoroProgressServiceV2 pomodoroProgressService;
    @PersistenceContext
    private EntityManager entityManager;

    private PomodoroRoom pomodoroRoom;
    private Member member;
    private PomodoroProgress pomodoroProgress;

    @BeforeEach
    void setUp() {
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        pomodoroRoom = new PomodoroRoom("roomName", 3, 20, participantCode);
        member = new Member("name");
        pomodoroProgress = new PomodoroProgress(pomodoroRoom, member);

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 특정_방에_속하는_멤버의_진행도를_조회한다() {
        // when
        PomodoroProgressResponseV2 progressResponse = pomodoroProgressService.findProgress(
                pomodoroRoom.getId(), member.getId());

        // then
        SoftAssertions.assertSoftly(softly -> {
            softly.assertThat(progressResponse.currentCycle()).isEqualTo(1);
            softly.assertThat(progressResponse.step()).isEqualTo("planning");
        });
    }

    @Test
    void 특정_방에_속하는_진행도를_진행시킨다() {
        // when
        pomodoroProgressService.proceed(pomodoroRoom.getId(), pomodoroProgress.getId());
        PomodoroProgressResponseV2 foundProgress = pomodoroProgressService.findProgress(
                pomodoroRoom.getId(), pomodoroProgress.getId());

        // then
        assertThat(foundProgress.step()).isEqualTo(
                PomodoroStatus.STUDYING.toString().toLowerCase());
    }
}
