package harustudy.backend.room.service;

import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.PomodoroRoomResponseV2;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class PomodoroRoomServiceV2Test {

    @Autowired
    private PomodoroRoomServiceV2 pomodoroRoomServiceV2;

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

        // when
        PomodoroRoomResponseV2 result = pomodoroRoomServiceV2.findPomodoroRoom(pomodoroRoom.getId());

        // then
        assertAll(
                () -> assertThat(result.name()).isEqualTo(pomodoroRoom.getName()),
                () -> assertThat(result.totalCycle()).isEqualTo(pomodoroRoom.getTotalCycle()),
                () -> assertThat(result.timePerCycle()).isEqualTo(pomodoroRoom.getTimePerCycle())
        );
    }

    @Test
    void 룸을_생성한다() {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("room", 8, 40);

        // when
        CreatePomodoroRoomDto result = pomodoroRoomServiceV2.createPomodoroRoom(request);

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

        // when
        PomodoroRoomResponseV2 result = pomodoroRoomServiceV2.findPomodoroRoomByParticipantCode(participantCode.getCode());

        // then
        assertAll(
                () -> assertThat(result.name()).isEqualTo(pomodoroRoom.getName()),
                () -> assertThat(result.totalCycle()).isEqualTo(pomodoroRoom.getTotalCycle()),
                () -> assertThat(result.timePerCycle()).isEqualTo(pomodoroRoom.getTimePerCycle())
        );
    }
}