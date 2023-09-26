package harustudy.backend.participant.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.dto.ParticipateStudyRequest;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyAlreadyStartedException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Transactional
public class ParticipantServiceTest {
//
//    private ParticipantService participantService;
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    private Study study1;
//    private Study study2;
//    private Member member1;
//    private Member member2;
//
//    @BeforeEach
//    void setUp() {
//        ParticipantCode participantCode1 = new ParticipantCode(new CodeGenerationStrategy());
//        ParticipantCode participantCode2 = new ParticipantCode(new CodeGenerationStrategy());
//        study1 = new Study("studyName1", 3, 20, participantCode1);
//        study2 = new Study("studyName2", 3, 20, participantCode2);
//        member1 = Member.guest();
//        member2 = Member.guest();
//
//        entityManager.persist(participantCode1);
//        entityManager.persist(participantCode2);
//        entityManager.persist(study1);
//        entityManager.persist(study2);
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
//        Participant participant = new Participant(study2, member1, "nickname1");
//        AuthMember authMember = new AuthMember(member1.getId());
//
//        entityManager.persist(participant);
//
//        // when
//        PomodossResponse response =
//                participantService.findParticipant(authMember, study2.getId(), participant.getId());
//        ParticipantResponse expected = ParticipantResponse.from(participant);
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
//        Participant participant = new Participant(study2, member1, "nickname1");
//        Participant anotherParticipant = new Participant(study2, member2, "nickname2");
//        AuthMember authMember1 = new AuthMember(member1.getId());
//
//        entityManager.persist(participant);
//        entityManager.persist(anotherParticipant);
//
//        // when
//        PomodossesResponse response =
//                participantService.findParticipantWithFilter(authMember1, study2.getId(), null);
//        ParticipantsResponse expected = ParticipantsResponse.from(List.of(
//                ParticipantResponse.from(participant),
//                ParticipantResponse.from(anotherParticipant)
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
//        assertsnBy(() ->
//                participantService.findParticipantWithFilter(authMember, study2.getId(), null))
//                .isInstanceOf(AuthorizationException.class);
//    }
//
//    @Test
//    void 특정_멤버의_진행도를_조회할_수_있다() {
//        // given
//        Participant participant = new Participant(study2, member1, "nickname1");
//        Participant anotherParticipant = new Participant(study2, member2, "nickname2");
//        AuthMember authMember1 = new AuthMember(member1.getId());
//
//        entityManager.persist(participant);
//        entityManager.persist(anotherParticipant);
//
//        // when
//        PomodossesResponse response =
//                participantService.findParticipantWithFilter(authMember1, study2.getId(), member1.getId());
//        ParticipantsResponse expected = ParticipantsResponse.from(List.of(
//                ParticipantResponse.from(participant)
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
//        Participant participant = new Participant(study2, member1, "nickname1");
//        AuthMember authMember = new AuthMember(member2.getId());
//
//        entityManager.persist(participant);
//
//        // when, then
//        assertsnBy(() ->
//                participantService.findParticipant(authMember, study2.getId(), participant.getId()))
//                .isInstanceOf(AuthorizationException.class);
//    }
//
//    @Test
//    void 해당_스터디의_진행도가_아니라면_조회할_수_없다() {
//        // given
//        Participant participant1 = new Participant(study1, member1, "nickname1");
//        Participant participant2 = new Participant(study2, member1, "nickname1");
//        AuthMember authMember = new AuthMember(member1.getId());
//
//        entityManager.persist(participant1);
//        entityManager.persist(participant2);
//
//        // when, then
//        assertsnBy(() ->
//                participantService.findParticipant(authMember, study1.getId(), participant2.getId()))
//                .isInstanceOf(ParticipantNotBelongToStudyException.class);
//    }
//
//    @Test
//    void 다음_스터디_단계로_이동할_수_있다() {
//        // given
//        Participant participant = new Participant(study2, member1, "nickname1");
//        AuthMember authMember1 = new AuthMember(member1.getId());
//
//        entityManager.persist(participant);
//        swhen
//        participantService.proceed(authMember1, study2.getId(), participant.getId());
//
//        // then
//        assertThat(participant.getStep()).isEqualTo(Step.STUDYING);
//    }
//
//    @Test
//    void 스터디에_참여하면_진행도가_생긴다() {
//        // given
//        AuthMember authMember1 = new AuthMember(member1.getId());
//
//        // when
//        ParticipateStudyRequest request = new ParticipateStudyRequest(member1.getId(), "nick");
//        Long participantId = participantService.participateStudy(authMember1, study2.getId(), request);
//
//        // then
//        Participant participant = entityManager.find(Participant.class, participantId);
//        assertSoftly(softly -> {
//            assertThat(participant.getNickname()).isEqualTo(request.nickname());
//            assertThat(participant.getMember().getId()).isEqualTo(request.memberId());
//            assertThat(participant.getCurrentCycle()).isEqualTo(1);
//            assertThat(participant.getStep()).isEqualTo(Step.PLANNING);
//        });
//    }

    @Autowired
    private ParticipantService participantService;

    @PersistenceContext
    private EntityManager entityManager;

    private Study study1;
    private Study study2;
    private Member member1;
    private Member member2;

    @BeforeEach
    void setUp() {
        study1 = new Study("studyName1", 3, 20);
        study2 = new Study("studyName2", 3, 20);
        ParticipantCode participantCode1 = new ParticipantCode(study1,
                new CodeGenerationStrategy());
        ParticipantCode participantCode2 = new ParticipantCode(study2,
                new CodeGenerationStrategy());
        member1 = Member.guest();
        member2 = Member.guest();

        entityManager.persist(study1);
        entityManager.persist(study2);
        entityManager.persist(participantCode1);
        entityManager.persist(participantCode2);
        entityManager.persist(member1);
        entityManager.persist(member2);

        entityManager.flush();
        entityManager.clear();
    }


    @Test
    void 이미_시작된_스터디에는_참여가_불가하다() {
        // given
        AuthMember authMember1 = new AuthMember(member1.getId());
        ParticipateStudyRequest request = new ParticipateStudyRequest(member1.getId(), "nick");
        Study study = entityManager.merge(study1);
        study.proceed();
        entityManager.flush();

        // when, then
        assertThatThrownBy(
                () -> participantService.participateStudy(authMember1, study1.getId(), request))
                .isInstanceOf(StudyAlreadyStartedException.class);
    }
}
