package harustudy.backend.progress.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.service.ContentService;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.dto.RoomAndProgressStepResponse;
import harustudy.backend.progress.exception.InvalidProgressException;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.Room;
import harustudy.backend.room.dto.MemberDto;
import harustudy.backend.room.dto.RoomAndMembersResponse;
import harustudy.backend.room.service.RoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
@SpringBootTest
@Transactional
class ProgressServiceTest {

    @Autowired
    private ProgressService progressService;
    @Autowired
    private ContentService contentService;
    @Autowired
    private RoomService roomService;
    @PersistenceContext
    private EntityManager entityManager;

    private ParticipantCode participantCode;
    private Room room;
    private Member member;
    private PomodoroProgress pomodoroProgress;
    private PomodoroContent pomodoroContent;
    private Map<String, String> plan;
    private Map<String, String> retrospect;


    @BeforeEach
    void setUp() {
        plan = Map.of(
                "toDo", "쿠키와 세션",
                "completionCondition", "완료조건",
                "expectedProbability", "80%",
                "expectedDifficulty", "예상되는 어려움",
                "whatCanYouDo", "가능성을 높이기 위해 무엇을 할 수 있을지?");

        retrospect = Map.of(
                "doneAsExpected", "예상했던 결과",
                "experiencedDifficulty", "겪었던 어려움",
                "lesson", "교훈");

        participantCode = new ParticipantCode(new CodeGenerationStrategy());
        room = new PomodoroRoom("room", 3, 20, participantCode);
        member = new Member("name");
        pomodoroProgress = new PomodoroProgress(room, member);
        pomodoroContent = new PomodoroContent(pomodoroProgress, 1, plan, retrospect);

        entityManager.persist(participantCode);
        entityManager.persist(room);
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);
        entityManager.persist(pomodoroContent);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 특정_멤버의_현재_사이클의_계획을_조회한다() {
        // given, when
        Map<String, String> currentCyclePlan = contentService.findCurrentCyclePlan(
                room.getId(), member.getId(), 1);

        // then
        assertAll(
                () -> assertThat(currentCyclePlan.get("toDo")).isEqualTo("쿠키와 세션"),
                () -> assertThat(currentCyclePlan.get("completionCondition")).isEqualTo(
                        "완료조건"),
                () -> assertThat(currentCyclePlan.get("expectedProbability")).isEqualTo(
                        "80%"),
                () -> assertThat(currentCyclePlan.get("expectedDifficulty")).isEqualTo(
                        "예상되는 어려움"),
                () -> assertThat(currentCyclePlan.get("whatCanYouDo")).isEqualTo(
                        "가능성을 높이기 위해 무엇을 할 수 있을지?")
        );
    }

    @Test
    void 스터디에_속하는_특정_멤버에_대한_정보를_조회한다() {
        // given, when
        RoomAndProgressStepResponse memberMetaData = progressService.findMemberMetaData(
                room.getId(), member.getId());

        // then
        assertAll(
                () -> assertThat(memberMetaData.studyName()).isEqualTo("room"),
                () -> assertThat(memberMetaData.totalCycle()).isEqualTo(3),
                () -> assertThat(memberMetaData.currentCycle()).isEqualTo(1),
                () -> assertThat(memberMetaData.timePerCycle()).isEqualTo(20),
                () -> assertThat(memberMetaData.step()).isEqualTo("planning")
        );
    }

    @Test
    void 스터디_메타데이터_및_참여한_모든_스터디원에_대한_정보를_조회한다() {
        // given, when
        RoomAndMembersResponse response = roomService.findStudyMetadata(room.getId());

        // then
        assertAll(
                () -> assertThat(response.studyName()).isEqualTo("room"),
                () -> assertThat(response.totalCycle()).isEqualTo(3),
                () -> assertThat(response.timePerCycle()).isEqualTo(20),
                () -> assertThat(response.members()).containsExactly(
                        new MemberDto(member.getId(), member.getNickname()))
        );
    }

    @Test
    void 특정_멤버의_현재_사이클의_계획_조회_시_스터디가_없으면_예외를_던진다() {
        // given, when, then
        assertThatThrownBy(() -> contentService.findCurrentCyclePlan(999L, member.getId(), 1))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 특정_멤버의_현재_사이클의_계획_조회_시_멤버가_없으면_예외를_던진다() {
        // given, when, then
        assertThatThrownBy(() -> contentService.findCurrentCyclePlan(room.getId(), 999L, 1))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디에_속하는_특정_멤버에_대한_정보를_조회_시_스터디가_없으면_예외를_던진다() {
        // given, when, then
        assertThatThrownBy(() -> progressService.findMemberMetaData(999L, member.getId()))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디에_속하는_특정_멤버에_대한_정보를_조회_시_멤버가_없으면_예외를_던진다() {
        // given, when, then
        assertThatThrownBy(() -> progressService.findMemberMetaData(room.getId(), 999L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디_메타데이터_및_참여한_모든_스터디원에_대한_정보를_조회_시_스터디가_없으면_예외를_던진다() {
        // given, when, then
        assertThatThrownBy(() -> roomService.findStudyMetadata(999L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 계획_상태에서는_회고_상태로_넘어갈_수_없다() {
        // given, when, then
        assertThatThrownBy(() -> progressService.proceedToRetrospect(room.getId(),
                member.getId()))
                .isInstanceOf(InvalidProgressException.UnavailableToProceed.class);
    }
}
