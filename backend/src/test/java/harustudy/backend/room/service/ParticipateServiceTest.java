package harustudy.backend.room.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.Room;
import harustudy.backend.room.exception.DuplicatedNicknameException;
import harustudy.backend.room.repository.RoomRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
class ParticipateServiceTest {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private RoomService roomService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private RoomRepository roomRepository;

    private ParticipantCode participantCode;
    private Room room;
    private Member member;

    @BeforeEach
    void setUp() {
        participantCode = new ParticipantCode(new CodeGenerationStrategy());
        room = new PomodoroRoom("room", 3, 20, participantCode);
        member = new Member("name");

        entityManager.persist(participantCode);
        entityManager.persist(room);
        entityManager.persist(member);

        entityManager.flush();
        entityManager.clear();
    }

    @Test
    void 닉네임을_받아_신규_멤버를_생성하고_스터디에_등록한다() {
        // when
        Long participatedMemberId = roomService.participate(room.getId(),
                member.getNickname());

        entityManager.flush();
        entityManager.clear();

        // then
        Member member = memberRepository.findById(participatedMemberId).get();
        Room foundRoom = roomRepository.findById(room.getId()).get();

        assertThat(foundRoom.isParticipatedMember(member)).isTrue();
    }

    @Test
    void 한_스터디_내에서_닉네임이_중복되면_예외를_던진다() {
        // given
        roomService.participate(room.getId(), member.getNickname());

        // when
        assertThatThrownBy(() -> roomService.participate(room.getId(), member.getNickname()))
                .isInstanceOf(DuplicatedNicknameException.class);
    }
}
