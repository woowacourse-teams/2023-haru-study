package harustudy.backend.room.repository;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

import harustudy.backend.config.BeanConfig;
import harustudy.backend.room.domain.GenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Import(BeanConfig.class)
@DataJpaTest
class PomodoroRoomRepositoryTest {

    @Autowired
    private PomodoroRoomRepository pomodoroRoomRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private GenerationStrategy generationStrategy;

    private ParticipantCode participantCode1;
    private ParticipantCode participantCode2;
    private ParticipantCode participantCode3;
    private PomodoroRoom pomodoroRoom1;
    private PomodoroRoom pomodoroRoom2;
    private PomodoroRoom pomodoroRoom3;

    @BeforeEach
    void setup() {
        participantCode1 = new ParticipantCode(generationStrategy);
        participantCode2 = new ParticipantCode(generationStrategy);
        participantCode3 = new ParticipantCode(generationStrategy);
        pomodoroRoom1 = new PomodoroRoom("room1", 1, 20, participantCode1);
        pomodoroRoom2 = new PomodoroRoom("room2", 2, 30, participantCode2);
        pomodoroRoom3 = new PomodoroRoom("room3", 3, 40, participantCode3);

        entityManager.persist(participantCode1);
        entityManager.persist(participantCode2);
        entityManager.persist(participantCode3);
        entityManager.persist(pomodoroRoom1);
        entityManager.persist(pomodoroRoom2);
        entityManager.persist(pomodoroRoom3);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 룸_아이디로_룸을_조회한다() {
        // given, when
        Optional<PomodoroRoom> found = pomodoroRoomRepository.findWithFilter(pomodoroRoom1.getId(),
                null);

        // then
        assertThat(found).isPresent();
        assertAll(
                () -> assertThat(found.get().getId()).isEqualTo(pomodoroRoom1.getId()),
                () -> assertThat(found.get().getName()).isEqualTo(pomodoroRoom1.getName())
        );
    }

    @Test
    void 존재하지_않는_룸_아이디로_룸을_조회하면_결과는_없다() {
        // given, when
        Optional<PomodoroRoom> found = pomodoroRoomRepository.findWithFilter(99999999L, null);

        // then
        assertThat(found).isEmpty();
    }

    @Test
    void 참여코드로_룸을_조회한다() {
        // given, when
        Optional<PomodoroRoom> found = pomodoroRoomRepository.findWithFilter(null,
                pomodoroRoom1.getParticipantCode().getCode());

        // then
        assertThat(found).isPresent();
        assertAll(
                () -> assertThat(found.get().getId()).isEqualTo(pomodoroRoom1.getId()),
                () -> assertThat(found.get().getName()).isEqualTo(pomodoroRoom1.getName())
        );
    }

    @Test
    void 존재하지_않는_참여코드로_룸을_조회하면_결과는_없다() {
        // given, when
        Optional<PomodoroRoom> found = pomodoroRoomRepository.findWithFilter(null, "QWERASDFZXCV");

        // then
        assertThat(found).isEmpty();
    }

    @Test
    void 참여코드와_룸_아이디로_룸을_조회한다() {
        // given, when
        Optional<PomodoroRoom> found = pomodoroRoomRepository.findWithFilter(pomodoroRoom1.getId(),
                pomodoroRoom1.getParticipantCode().getCode());

        // then
        assertThat(found).isPresent();
        assertAll(
                () -> assertThat(found.get().getId()).isEqualTo(pomodoroRoom1.getId()),
                () -> assertThat(found.get().getName()).isEqualTo(pomodoroRoom1.getName())
        );
    }
}