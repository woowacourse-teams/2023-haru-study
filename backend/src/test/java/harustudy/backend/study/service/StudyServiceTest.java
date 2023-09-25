package harustudy.backend.study.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class StudyServiceTest {
//
//    @Autowired
//    private StudyService studyService;
//
//    private EntityManager entityManager;
//
//    @Autowired
//    private GenerationStrategy generationStrategy;
//
//    @Test
//    void 스터디_아이디로_스터디를_조회한다() {
//        // given
//        Study study = new Study("study", 8, 20);
//        entityManager.persist(study);
//        entityManager.flush();
//        entityManager.clear();
//
//        // when
//        StudyResponse result = studyService.findPoudy(study.getId());
//
//        // then
//        assertAll(
//                () -> assertThat(result.studyId()).isEqualTo(study.getId()),
//                () -> assertThat(result.name()).isEqualTo(study.getName()),
//                () -> assertThat(result.totalCycle()).isEqualTo(study.getTotalCycle()),
//                () -> assertThat(result.timePerCycle()).isEqualTo(study.getTimePerCycle())
//        );
//    }
//
//    @Test
//    void 룸_아이디로_룸_조회시_없으면_예외를_던진다() {
//        // given
//        Study study = new Study("study", 8, 20);
//        entityManager.persist(study);
//        entityManager.flush();
//        entityManager.clear();
//
//        // when, then
//        assertThatThrownBy(() -> studyService.findPoudyWithFilter(99999L, null), null)
//                .isInstanceOf(MemberNotFoundException.class);
//    }
//
//    @Test
//    void 스터디를_생성한다() {
//        // given
//        CreateStudyRequest request = new CreateStudyRequest("study", 8, 40);
//
//        // when
//        CreateStudyResponse result = studyService.createStudy(request);
//
//        // then
//        assertAll(
//                () -> assertThat(result.studyId()).isNotNull(),
//                () -> assertThat(result.participantCode()).isNotNull()
//        );
//    }
//
//    @Test
//    void 참여코드에_해당하는_스터디를_조회한다() {
//        // given
//        CreateStudyRequest request = new CreateStudyRequest("study", 8, 40);
//        CreateStudyResponse response = studyService.createStudy(request);
//        String participantCode = response.participantCode();
//
//        // when
//        StudiesResponse result = studyService.findPoudyWithFilter(null,
//                participantCode);
//
//        // then
//        assertAll(
//                () -> assertThat(result.studies()).hasSize(1),
//                () -> assertThat(result.studies().get(0).name()).isEqualTo(request.name()),
//                () -> assertThat(result.studies().get(0).totalCycle()).isEqualTo(
//                        request.totalCycle()),
//                () -> assertThat(result.studies().get(0).timePerCycle()).isEqualTo(
//                        request.timePerCycle())
//        );
//    }
//
//    @Test
//    void 참여코드에_해당하는_룸_조회시_참여코드가_없으면_예외를_던진다() {
//        // given
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        Study study = new Study("study", 8, 40, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(study);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        ParticipantCode notPersisted = new ParticipantCode(generationStrategy);
//
//        // when, then
//        assertThatThrownBy(
//                () -> studyService.findPoudyWithFilter(null, notPersisted.getCode()))
//                .isInstanceOf(ParticipantCodeNotFoundException.class);
//    }
//
//    @Test
//    void 참여코드에_해당하는_룸_조회시_참여코드에_해당하는_룸이_없으면_예외를_던진다() {
//        // given
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        Study study = new Study("study", 8, 40, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(study);
//
//        ParticipantCode notStudiesCode = new ParticipantCode(generationStrategy);
//        entityManager.persist(notStudiesCode);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        // when, then
//        assertThatThrownBy(
//                () -> studyService.findStudyWithFilter(null, notStudiesCode.getCode()))
//                .isInstanceOf(StudyNotFoundException.class);
//    }
}
