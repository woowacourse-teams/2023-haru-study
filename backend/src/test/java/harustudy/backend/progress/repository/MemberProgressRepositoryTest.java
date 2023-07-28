//package harustudy.backend.progress.repository;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import harustudy.backend.member.domain.Member;
//import harustudy.backend.member.repository.MemberRepository;
//import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
//import harustudy.backend.participantcode.domain.ParticipantCode;
//import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
//import harustudy.backend.room.domain.progress.PomodoroProgress;
//import harustudy.backend.room.domain.PomodoroRoom;
//
//import java.util.List;
//import java.util.Optional;
//
//import harustudy.backend.room.repository.PomodoroRoomRepository;
//import org.junit.jupiter.api.DisplayNameGeneration;
//import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
//
//@SuppressWarnings("NonAsciiCharacters")
//@DisplayNameGeneration(ReplaceUnderscores.class)
//@DataJpaTest
//class MemberProgressRepositoryTest {
//
//    @Autowired
//    private PomodoroRoomRepository pomodoroRoomRepository;
//    @Autowired
//    private MemberRepository memberRepository;
//    @Autowired
//    private ParticipantCodeRepository participantCodeRepository;
//
//    @Autowired
//    private TestEntityManager testEntityManager;
//
//    @Test
//    void Study와_Member를_통해_MemberProgress를_조회할_수_있다() {
//        // given
//        Member member = new Member("member");
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        PomodoroRoom study = new PomodoroRoom("studyName", 1, 20, participantCode);
//        memberRepository.save(member);
//        participantCodeRepository.save(participantCode);
//        pomodoroRoomRepository.save(study);
//
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member);
//        testEntityManager.persist(pomodoroProgress);
//
//        testEntityManager.flush();
//        testEntityManager.clear();
//
//        // when
//        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(study.getId()).get();
//        Optional<PomodoroProgress> found = pomodoroRoom.findProgressByMember(member);
//
//        // then
//        assertThat(found).isPresent();
//        assertThat(found.get().getId()).isEqualTo(pomodoroProgress.getId());
//    }
//
//    @Test
//    void studyId로_MemberProgress_리스트를_조회한다() {
//        // given
//        Member member1 = new Member("member1");
//        Member member2 = new Member("member2");
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        PomodoroRoom study = new PomodoroRoom("studyName", 1, 20, participantCode);
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        participantCodeRepository.save(participantCode);
//        pomodoroRoomRepository.save(study);
//
//        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(study, member1);
//        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(study, member2);
//        testEntityManager.persist(pomodoroProgress1);
//        testEntityManager.persist(pomodoroProgress2);
//
//        testEntityManager.flush();
//        testEntityManager.clear();
//
//        // when
//        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(study.getId()).get();
//        List<PomodoroProgress> pomodoroProgresses = pomodoroRoom.getPomodoroProgresses();
//
//        // then
//        assertThat(pomodoroProgresses.size()).isEqualTo(2);
//    }
//}
