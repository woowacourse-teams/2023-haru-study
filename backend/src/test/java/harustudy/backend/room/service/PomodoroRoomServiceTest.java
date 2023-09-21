package harustudy.backend.room.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.room.domain.GenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomsResponse;
import harustudy.backend.room.exception.ParticipantCodeNotFoundException;
import harustudy.backend.room.exception.RoomNotFoundException;
import jakarta.persistence.EntityManager;
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
class PomodoroRoomServiceTest {

    @Autowired
    private PomodoroRoomService pomodoroRoomService;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private GenerationStrategy generationStrategy;

    @Test
    void 룸_아이디로_룸을_조회한다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 20, participantCode);
        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);

        entityManager.flush();
        entityManager.clear();

        // when
        PomodoroRoomResponse result = pomodoroRoomService.findPomodoroRoom(pomodoroRoom.getId());

        // then
        assertAll(
                () -> assertThat(result.studyId()).isEqualTo(pomodoroRoom.getId()),
                () -> assertThat(result.name()).isEqualTo(pomodoroRoom.getName()),
                () -> assertThat(result.totalCycle()).isEqualTo(pomodoroRoom.getTotalCycle()),
                () -> assertThat(result.timePerCycle()).isEqualTo(pomodoroRoom.getTimePerCycle())
        );
    }

    @Test
    void 룸_아이디로_룸_조회시_없으면_예외를_던진다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 20, participantCode);
        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);

        entityManager.flush();
        entityManager.clear();

        // when, then
        assertThatThrownBy(() -> pomodoroRoomService.findPomodoroRoomWithFilter(99999L, null), null)
                .isInstanceOf(MemberNotFoundException.class);
    }

    @Test
    void 룸을_생성한다() {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("room", 8, 40);

        // when
        CreatePomodoroRoomResponse result = pomodoroRoomService.createPomodoroRoom(request);

        // then
        assertAll(
                () -> assertThat(result.studyId()).isNotNull(),
                () -> assertThat(result.participantCode()).isNotNull()
        );
    }

    @Test
    void 참여코드에_해당하는_룸을_조회한다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 40, participantCode);
        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);

        entityManager.flush();
        entityManager.clear();

        // when
        PomodoroRoomsResponse result = pomodoroRoomService.findPomodoroRoomWithFilter(null,
                participantCode.getCode());

        // then
        assertAll(
                () -> assertThat(result.studies()).hasSize(1),
                () -> assertThat(result.studies().get(0).name()).isEqualTo(pomodoroRoom.getName()),
                () -> assertThat(result.studies().get(0).totalCycle()).isEqualTo(pomodoroRoom.getTotalCycle()),
                () -> assertThat(result.studies().get(0).timePerCycle()).isEqualTo(pomodoroRoom.getTimePerCycle())
        );
    }

    @Test
    void 참여코드에_해당하는_룸_조회시_참여코드가_없으면_예외를_던진다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 40, participantCode);
        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);

        entityManager.flush();
        entityManager.clear();

        ParticipantCode notPersisted = new ParticipantCode(generationStrategy);

        // when, then
        assertThatThrownBy(
                () -> pomodoroRoomService.findPomodoroRoomWithFilter(null, notPersisted.getCode()))
                .isInstanceOf(ParticipantCodeNotFoundException.class);
    }

    @Test
    void 참여코드에_해당하는_룸_조회시_참여코드에_해당하는_룸이_없으면_예외를_던진다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 40, participantCode);
        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);

        ParticipantCode notRoomsCode = new ParticipantCode(generationStrategy);
        entityManager.persist(notRoomsCode);

        entityManager.flush();
        entityManager.clear();

        // when, then
        assertThatThrownBy(
                () -> pomodoroRoomService.findPomodoroRoomWithFilter(null, notRoomsCode.getCode()))
                .isInstanceOf(RoomNotFoundException.class);
    }
}
