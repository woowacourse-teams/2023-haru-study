package harustudy.backend.participant.repository;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest
class ParticipantRepositoryTest {
//
//    @Autowired
//    private ParticipantRepository participantRepository;
//
//    @Autowired
//    private StudyRepository studyRepository;
//
//    @Autowired
//    private MemberRepository memberRepository;
//
//    @Autowired
//    private TestEntityManager testEntityManager;
//
//    @Test
//    void study와_member를_통해_participant를_조회한다() {
//        // given
//        Member member = new Member("member", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        Study study = new Study("studyName", 1, 20, participantCode);
//        memberRepository.save(member);
//        participantCodeRepository.save(participantCode);
//        studyRepository.save(study);
//
//        Participant participant = new Participant(study, member, "nickname");
//        participantRepository.save(participant);
//
//        testEntityManager.flush();
//        testEntityManager.clear();
//
//        // when
//        Optional<Participant> found = participantRepository.findByStudyAndMember(
//                study, member);
//
//        // then
//        assertThat(found).isPresent();
//        assertThat(found.get().getId()).isEqualTo(participant.getId());
//    }
//
//    @Test
//    void study로_participant_리스트를_조회한다() {
//        // given
//        Member member1 = new Member("member1", "email", "imageUrl", LoginType.GUEST);
//        Member member2 = new Member("member2", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        Study study = new Study("studyName", 1, 20, participantCode);
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        participantCodeRepository.save(participantCode);
//        studyRepository.save(study);
//
//        Participant participant1 = new Participant(study, member1, "nickname1");
//        Participant participant2 = new Participant(study, member2, "nickname2");
//        participantRepository.save(participant1);
//        participantRepository.save(participant2);
//
//        // when
//        List<Participant> participants = participantRepository.findByStudy(
//                study);
//
//        // then
//        assertThat(participants).hasSize(2);
//    }
//
//    @Test
//    void study로_participant와_member를_함께_조회한다() {
//        // given
//        Member member1 = new Member("member1", "email", "imageUrl", LoginType.GUEST);
//        Member member2 = new Member("member2", "email", "imageUrl", LoginType.GUEST);
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        Study study = new Study("studyName", 1, 20, participantCode);
//        memberRepository.save(member1);
//        memberRepository.save(member2);
//        participantCodeRepository.save(participantCode);
//        studyRepository.save(study);
//
//        Participant participant1 = new Participant(study, member1, "nickname1");
//        Participant participant2 = new Participant(study, member2, "nickname2");
//        participantRepository.save(participant1);
//        participantRepository.save(participant2);
//
//        testEntityManager.flush();
//        testEntityManager.clear();
//
//        PersistenceUtil persistenceUtil = testEntityManager.getEntityManager()
//                .getEntityManagerFactory().getPersistenceUnitUtil();
//
//        // when
//        List<Participant> participants = participantRepository.findAllByStudyFetchMember(
//                study);
//
//        // then
//        assertSoftly(softly -> {
//            softly.assertThat(participants).hasSize(2);
//            softly.assertThat(persistenceUtil.isLoaded(member1)).isTrue();
//            softly.assertThat(persistenceUtil.isLoaded(member2)).isTrue();
//        });
//    }
}
