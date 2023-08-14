//package harustudy.backend.room.service;
//
//import harustudy.backend.room.domain.GenerationStrategy;
//import harustudy.backend.room.domain.ParticipantCode;
//import harustudy.backend.room.exception.ParticipantCodeNotFoundException;
//import harustudy.backend.room.domain.PomodoroRoom;
//import harustudy.backend.room.dto.CreatePomodoroRoomDto;
//import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
//import harustudy.backend.room.dto.PomodoroRoomResponseV2;
//import harustudy.backend.room.exception.RoomNotFoundException;
//import jakarta.persistence.EntityManager;
//import org.junit.jupiter.api.DisplayNameGeneration;
//import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
//import static org.junit.jupiter.api.Assertions.assertAll;
//
//@SuppressWarnings("NonAsciiCharacters")
//@DisplayNameGeneration(ReplaceUnderscores.class)
//@Transactional
//@SpringBootTest
//class PomodoroRoomServiceV2Test {
//
//    @Autowired
//    private PomodoroRoomServiceV2 pomodoroRoomServiceV2;
//
//    @Autowired
//    private EntityManager entityManager;
//
//    @Autowired
//    private GenerationStrategy generationStrategy;
//
//    @Test
//    void 룸_아이디로_룸을_조회한다() {
//        // given
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 20, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(pomodoroRoom);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        // when
//        PomodoroRoomResponseV2 result = pomodoroRoomServiceV2.findPomodoroRoom(pomodoroRoom.getId());
//
//        // then
//        assertAll(
//                () -> assertThat(result.name()).isEqualTo(pomodoroRoom.getName()),
//                () -> assertThat(result.totalCycle()).isEqualTo(pomodoroRoom.getTotalCycle()),
//                () -> assertThat(result.timePerCycle()).isEqualTo(pomodoroRoom.getTimePerCycle())
//        );
//    }
//
//    @Test
//    void 룸_아이디로_룸_조회시_없으면_예외를_던진다() {
//        // given
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 20, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(pomodoroRoom);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        // when, then
//        assertThatThrownBy(() -> pomodoroRoomServiceV2.findPomodoroRoom(99999L))
//            .isInstanceOf(RoomNotFoundException.class);
//    }
//
//    @Test
//    void 룸을_생성한다() {
//        // given
//        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("room", 8, 40);
//
//        // when
//        CreatePomodoroRoomDto result = pomodoroRoomServiceV2.createPomodoroRoom(request);
//
//        // then
//        assertAll(
//                () -> assertThat(result.studyId()).isNotNull(),
//                () -> assertThat(result.participantCode()).isNotNull()
//        );
//    }
//
//    @Test
//    void 참여코드에_해당하는_룸을_조회한다() {
//        // given
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 40, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(pomodoroRoom);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        // when
//        PomodoroRoomResponseV2 result = pomodoroRoomServiceV2.findPomodoroRoomByParticipantCode(participantCode.getCode());
//
//        // then
//        assertAll(
//                () -> assertThat(result.name()).isEqualTo(pomodoroRoom.getName()),
//                () -> assertThat(result.totalCycle()).isEqualTo(pomodoroRoom.getTotalCycle()),
//                () -> assertThat(result.timePerCycle()).isEqualTo(pomodoroRoom.getTimePerCycle())
//        );
//    }
//
//    @Test
//    void 참여코드에_해당하는_룸_조회시_참여코드가_없으면_예외를_던진다() {
//        // given
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 40, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(pomodoroRoom);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        ParticipantCode notPersisted = new ParticipantCode(generationStrategy);
//
//        // when, then
//        assertThatThrownBy(() -> pomodoroRoomServiceV2.findPomodoroRoomByParticipantCode(notPersisted.getCode()))
//            .isInstanceOf(ParticipantCodeNotFoundException.class);
//    }
//
//    @Test
//    void 참여코드에_해당하는_룸_조회시_참여코드에_해당하는_룸이_없으면_예외를_던진다() {
//        // given
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        PomodoroRoom pomodoroRoom = new PomodoroRoom("room", 8, 40, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(pomodoroRoom);
//
//        ParticipantCode notRoomsCode = new ParticipantCode(generationStrategy);
//        entityManager.persist(notRoomsCode);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        // when, then
//        assertThatThrownBy(() -> pomodoroRoomServiceV2.findPomodoroRoomByParticipantCode(notRoomsCode.getCode()))
//                .isInstanceOf(RoomNotFoundException.class);
//    }
//}
