package harustudy.backend.room.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.exception.DuplicatedNicknameException;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Deprecated
@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Transactional
class PomodoroRoomServiceTest {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private PomodoroRoomService pomodoroRoomService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private PomodoroRoomRepository pomodoroRoomRepository;

    private ParticipantCode participantCode;
    private PomodoroRoom pomodoroRoom;
    private Member member;

    @BeforeEach
    void setUp() {
        participantCode = new ParticipantCode(new CodeGenerationStrategy());
        pomodoroRoom = new PomodoroRoom("roomName", 3, 20, participantCode);
        member = new Member("name");

        entityManager.persist(participantCode);
        entityManager.persist(pomodoroRoom);
        entityManager.persist(member);

        entityManager.flush();
        entityManager.clear();
    }

    @Deprecated
    @Test
    void 닉네임을_받아_신규_멤버를_생성하고_스터디에_등록한다() {
        // when
        Long participatedMemberId = pomodoroRoomService.participate(pomodoroRoom.getId(),
                member.getNickname());

        entityManager.flush();
        entityManager.clear();

        // then
        Member member = memberRepository.findById(participatedMemberId).get();
        PomodoroRoom foundRoom = pomodoroRoomRepository.findById(pomodoroRoom.getId()).get();

        assertThat(foundRoom.isParticipatedMember(member)).isTrue();
    }

    @Deprecated
    @Test
    void 한_스터디_내에서_닉네임이_중복되면_예외를_던진다() {
        // given
        pomodoroRoomService.participate(pomodoroRoom.getId(), member.getNickname());

        entityManager.flush();
        entityManager.clear();

        // when
        assertThatThrownBy(() -> pomodoroRoomService.participate(pomodoroRoom.getId(), member.getNickname()))
                .isInstanceOf(DuplicatedNicknameException.class);
    }
}
