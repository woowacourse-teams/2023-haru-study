package harustudy.backend.progress.service;

import static org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

import harustudy.backend.study.domain.PomodoroStudy;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Transactional
public class PomodoroProgressServiceTest {

//    @Autowired
//    private PomodoroProgressService pomodoroProgressService;
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    private PomodoroStudy pomodoroStudy1;
//    private PomodoroStudy pomodoroStudy2;
//    private Member member1;
//    private Member member2;
//
//    @BeforeEach
//    void setUp() {
//        ParticipantCode participantCode1 = new ParticipantCode(new CodeGenerationStrategy());
//        ParticipantCode participantCode2 = new ParticipantCode(new CodeGenerationStrategy());
//        pomodoroStudy1 = new PomodoroStudy("studyName1", 3, 20, participantCode1);
//        pomodoroStudy2 = new PomodoroStudy("studyName2", 3, 20, participantCode2);
//        member1 = Member.guest();
//        member2 = Member.guest();
//
//        entityManager.persist(participantCode1);
//        entityManager.persist(participantCode2);
//        entityManager.persist(pomodoroStudy1);
//        entityManager.persist(pomodoroStudy2);
//        entityManager.persist(member1);
//        entityManager.persist(member2);
//
//        entityManager.flush();
//        entityManager.clear();
//    }
//
//    @Test
//    void 진행도를_조회할_수_있다() {
//        // given
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroStudy2, member1, "nickname1");
//        AuthMember authMember = new AuthMember(member1.getId());
//
//        entityManager.persist(pomodoroProgress);
//
//        // when
//        PomodoroProgressResponse response =
//                pomodoroProgressService.findPomodoroProgress(authMember, pomodoroStudy2.getId(), pomodoroProgress.getId());
//        PomodoroProgressResponse expected = PomodoroProgressResponse.from(pomodoroProgress);
//
//        // then
//        assertThat(response).usingRecursiveComparison()
//                .ignoringExpectedNullFields()
//                .isEqualTo(expected);
//    }
//
//    @Test
//    void 스터디의_모든_진행도를_조회할_수_있다() {
//        // given
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroStudy2, member1, "nickname1");
//        PomodoroProgress anotherPomodoroProgress = new PomodoroProgress(pomodoroStudy2, member2, "nickname2");
//        AuthMember authMember1 = new AuthMember(member1.getId());
//
//        entityManager.persist(pomodoroProgress);
//        entityManager.persist(anotherPomodoroProgress);
//
//        // when
//        PomodoroProgressesResponse response =
//                pomodoroProgressService.findPomodoroProgressWithFilter(authMember1, pomodoroStudy2.getId(), null);
//        PomodoroProgressesResponse expected = PomodoroProgressesResponse.from(List.of(
//                PomodoroProgressResponse.from(pomodoroProgress),
//                PomodoroProgressResponse.from(anotherPomodoroProgress)
//        ));
//
//        // then
//        assertThat(response).usingRecursiveComparison()
//                .ignoringExpectedNullFields()
//                .isEqualTo(expected);
//    }
//
//    @Test
//    void 참여하지_않은_스터디에_대해서는_모든_진행도를_조회할_수_없다() {
//        // given
//        AuthMember authMember = new AuthMember(member1.getId());
//
//        // when, then
//        assertThatThrownBy(() ->
//                pomodoroProgressService.findPomodoroProgressWithFilter(authMember, pomodoroStudy2.getId(), null))
//                .isInstanceOf(AuthorizationException.class);
//    }
//
//    @Test
//    void 특정_멤버의_진행도를_조회할_수_있다() {
//        // given
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroStudy2, member1, "nickname1");
//        PomodoroProgress anotherPomodoroProgress = new PomodoroProgress(pomodoroStudy2, member2, "nickname2");
//        AuthMember authMember1 = new AuthMember(member1.getId());
//
//        entityManager.persist(pomodoroProgress);
//        entityManager.persist(anotherPomodoroProgress);
//
//        // when
//        PomodoroProgressesResponse response =
//                pomodoroProgressService.findPomodoroProgressWithFilter(authMember1, pomodoroStudy2.getId(), member1.getId());
//        PomodoroProgressesResponse expected = PomodoroProgressesResponse.from(List.of(
//                PomodoroProgressResponse.from(pomodoroProgress)
//        ));
//
//        // then
//        assertThat(response).usingRecursiveComparison()
//                .ignoringExpectedNullFields()
//                .isEqualTo(expected);
//    }
//
//    @Test
//    void 자신의_소유가_아닌_진행도는_조회할_수_없다() {
//        // given
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroStudy2, member1, "nickname1");
//        AuthMember authMember = new AuthMember(member2.getId());
//
//        entityManager.persist(pomodoroProgress);
//
//        // when, then
//        assertThatThrownBy(() ->
//                pomodoroProgressService.findPomodoroProgress(authMember, pomodoroStudy2.getId(), pomodoroProgress.getId()))
//                .isInstanceOf(AuthorizationException.class);
//    }
//
//    @Test
//    void 해당_스터디의_진행도가_아니라면_조회할_수_없다() {
//        // given
//        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(pomodoroStudy1, member1, "nickname1");
//        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(pomodoroStudy2, member1, "nickname1");
//        AuthMember authMember = new AuthMember(member1.getId());
//
//        entityManager.persist(pomodoroProgress1);
//        entityManager.persist(pomodoroProgress2);
//
//        // when, then
//        assertThatThrownBy(() ->
//                pomodoroProgressService.findPomodoroProgress(authMember, pomodoroStudy1.getId(), pomodoroProgress2.getId()))
//                .isInstanceOf(ProgressNotBelongToStudyException.class);
//    }
//
//    @Test
//    void 다음_스터디_단계로_이동할_수_있다() {
//        // given
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroStudy2, member1, "nickname1");
//        AuthMember authMember1 = new AuthMember(member1.getId());
//
//        entityManager.persist(pomodoroProgress);
//
//        // when
//        pomodoroProgressService.proceed(authMember1, pomodoroStudy2.getId(), pomodoroProgress.getId());
//
//        // then
//        assertThat(pomodoroProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.STUDYING);
//    }
//
//    @Test
//    void 스터디에_참여하면_진행도가_생긴다() {
//        // given
//        AuthMember authMember1 = new AuthMember(member1.getId());
//
//        // when
//        ParticipateStudyRequest request = new ParticipateStudyRequest(member1.getId(), "nick");
//        Long progressId = pomodoroProgressService.participateStudy(authMember1, pomodoroStudy2.getId(), request);
//
//        // then
//        PomodoroProgress pomodoroProgress = entityManager.find(PomodoroProgress.class, progressId);
//        assertSoftly(softly -> {
//            assertThat(pomodoroProgress.getNickname()).isEqualTo(request.nickname());
//            assertThat(pomodoroProgress.getMember().getId()).isEqualTo(request.memberId());
//            assertThat(pomodoroProgress.getCurrentCycle()).isEqualTo(1);
//            assertThat(pomodoroProgress.getPomodoroStatus()).isEqualTo(PomodoroStatus.PLANNING);
//        });
//    }
}
