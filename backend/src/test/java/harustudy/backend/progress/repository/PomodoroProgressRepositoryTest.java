package harustudy.backend.progress.repository;

import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest
class PomodoroProgressRepositoryTest {
//
//    @Autowired
//    private PomodoroProgressRepository pomodoroProgressRepository;
//
//    @Autowired
//    private PomodoroRoomRepository pomodoroRoomRepository;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private TestEntityManager testEntityManager;
//
//    @Test
//    void room과_member를_통해_pomodoroProgress를_조회한다() {
//        // given
//        Member member = new Member("member", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 1, 20, participantCode);
//        memberRepository.save(member);
//        participantCodeRepository.save(participantCode);
//        pomodoroRoomRepository.save(pomodoroRoom);
//
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, "nickname");
//        pomodoroProgressRepository.save(pomodoroProgress);
//
//        testEntityManager.flush();
//        testEntityManager.clear();
//
//        // when
//        Optional<PomodoroProgress> found = pomodoroProgressRepository.findByPomodoroRoomAndMember(
//                pomodoroRoom, member);
//
//        // then
//        assertThat(found).isPresent();
//        assertThat(found.get().getId()).isEqualTo(pomodoroProgress.getId());
//    }
//
//    @Test
//    void room으로_pomodoroProgress_리스트를_조회한다() {
//        // given
//        Member member1 = new Member("member1", "email", "imageUrl", LoginType.GUEST);
//        Member member2 = new Member("member2", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 1, 20, participantCode);
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        participantCodeRepository.save(participantCode);
//        pomodoroRoomRepository.save(pomodoroRoom);
//
//        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(pomodoroRoom, member1, "nickname1");
//        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(pomodoroRoom, member2, "nickname2");
//        pomodoroProgressRepository.save(pomodoroProgress1);
//        pomodoroProgressRepository.save(pomodoroProgress2);
//
//        // when
//        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findByPomodoroRoom(
//                pomodoroRoom);
//
//        // then
//        assertThat(pomodoroProgresses).hasSize(2);
//    }
//
//    @Test
//    void room으로_pomodoroProgress와_member를_함께_조회한다() {
//        // given
//        Member member1 = new Member("member1", "email", "imageUrl", LoginType.GUEST);
//        Member member2 = new Member("member2", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 1, 20, participantCode);
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        participantCodeRepository.save(participantCode);
//        pomodoroRoomRepository.save(pomodoroRoom);
//
//        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(pomodoroRoom, member1, "nickname1");
//        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(pomodoroRoom, member2, "nickname2");
//        pomodoroProgressRepository.save(pomodoroProgress1);
//        pomodoroProgressRepository.save(pomodoroProgress2);
//
//        testEntityManager.flush();
//        testEntityManager.clear();
//
//        PersistenceUtil persistenceUtil = testEntityManager.getEntityManager()
//                .getEntityManagerFactory().getPersistenceUnitUtil();
//
//        // when
//        List<PomodoroProgress> progresses = pomodoroProgressRepository.findAllByPomodoroRoomFetchMember(
//                pomodoroRoom);
//
//        // then
//        assertSoftly(softly -> {
//            softly.assertThat(progresses).hasSize(2);
//            softly.assertThat(persistenceUtil.isLoaded(member1)).isTrue();
//            softly.assertThat(persistenceUtil.isLoaded(member2)).isTrue();
//        });
//    }
}
