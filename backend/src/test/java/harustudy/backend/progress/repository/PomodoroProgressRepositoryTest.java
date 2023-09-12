package harustudy.backend.progress.repository;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest
class PomodoroProgressRepositoryTest {
//
//    @Autowired
//    private PomodoroProgressRepository pomodoroProgressRepository;
//
//    @Autowired
//    private PomodoroStudyRepository pomodoroStudyRepository;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private TestEntityManager testEntityManager;
//
//    @Test
//    void study와_member를_통해_pomodoroProgress를_조회한다() {
//        // given
//        Member member = new Member("member", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        PomodoroStudy pomodoroStudy = new PomodoroStudy("studyName", 1, 20, participantCode);
//        memberRepository.save(member);
//        participantCodeRepository.save(participantCode);
//        pomodoroStudyRepository.save(pomodoroStudy);
//
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroStudy, member, "nickname");
//        pomodoroProgressRepository.save(pomodoroProgress);
//
//        testEntityManager.flush();
//        testEntityManager.clear();
//
//        // when
//        Optional<PomodoroProgress> found = pomodoroProgressRepository.findByPomodoroStudyAndMember(
//                pomodoroStudy, member);
//
//        // then
//        assertThat(found).isPresent();
//        assertThat(found.get().getId()).isEqualTo(pomodoroProgress.getId());
//    }
//
//    @Test
//    void study로_pomodoroProgress_리스트를_조회한다() {
//        // given
//        Member member1 = new Member("member1", "email", "imageUrl", LoginType.GUEST);
//        Member member2 = new Member("member2", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        PomodoroStudy pomodoroStudy = new PomodoroStudy("studyName", 1, 20, participantCode);
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        participantCodeRepository.save(participantCode);
//        pomodoroStudyRepository.save(pomodoroStudy);
//
//        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(pomodoroStudy, member1, "nickname1");
//        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(pomodoroStudy, member2, "nickname2");
//        pomodoroProgressRepository.save(pomodoroProgress1);
//        pomodoroProgressRepository.save(pomodoroProgress2);
//
//        // when
//        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findByPomodoroStudy(
//                pomodoroStudy);
//
//        // then
//        assertThat(pomodoroProgresses).hasSize(2);
//    }
//
//    @Test
//    void study로_pomodoroProgress와_member를_함께_조회한다() {
//        // given
//        Member member1 = new Member("member1", "email", "imageUrl", LoginType.GUEST);
//        Member member2 = new Member("member2", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        PomodoroStudy pomodoroStudy = new PomodoroStudy("studyName", 1, 20, participantCode);
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        participantCodeRepository.save(participantCode);
//        pomodoroStudyRepository.save(pomodoroStudy);
//
//        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(pomodoroStudy, member1, "nickname1");
//        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(pomodoroStudy, member2, "nickname2");
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
//        List<PomodoroProgress> progresses = pomodoroProgressRepository.findAllByPomodoroStudyFetchMember(
//                pomodoroStudy);
//
//        // then
//        assertSoftly(softly -> {
//            softly.assertThat(progresses).hasSize(2);
//            softly.assertThat(persistenceUtil.isLoaded(member1)).isTrue();
//            softly.assertThat(persistenceUtil.isLoaded(member2)).isTrue();
//        });
//    }
}
