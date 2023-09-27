package harustudy.backend.participant.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.participant.dto.ParticipantsResponse;
import harustudy.backend.participant.dto.ParticipateStudyRequest;
import harustudy.backend.participant.exception.ParticipantNotBelongToStudyException;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyAlreadyStartedException;
import harustudy.backend.testutils.EntityManagerUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.assertj.core.api.AssertionsForClassTypes;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Stream;

import static harustudy.backend.testutils.EntityManagerUtil.flushAndClearContext;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Transactional
class ParticipantServiceTest {

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

        ParticipantCode participantCode1 = new ParticipantCode(study1, new CodeGenerationStrategy());
        ParticipantCode participantCode2 = new ParticipantCode(study2, new CodeGenerationStrategy());

        member1 = Member.guest();
        member2 = Member.guest();

        entityManager.persist(study1);
        entityManager.persist(study2);
        entityManager.persist(participantCode1);
        entityManager.persist(participantCode2);
        entityManager.persist(member1);
        entityManager.persist(member2);
        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    @Test
    void 이미_시작된_스터디에는_참여가_불가하다() {
        // given
        AuthMember authMember1 = new AuthMember(member1.getId());
        ParticipateStudyRequest request = new ParticipateStudyRequest(member1.getId(), "nick");
        Study study = entityManager.merge(study1);
        study.proceed();
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when, then
        assertThatThrownBy(
                () -> participantService.participateStudy(authMember1, study1.getId(), request))
                .isInstanceOf(StudyAlreadyStartedException.class);
    }

    @Test
    void 스터디의_모든_참여자_정보를_조회할_수_있다() {
        // given
        Participant participant = Participant.instantiateParticipantWithContents(study2, member1, "nickname1");
        Participant anotherParticipant = Participant.instantiateParticipantWithContents(study2, member2, "nickname2");
        AuthMember authMember1 = new AuthMember(member1.getId());

        entityManager.persist(participant);
        entityManager.persist(anotherParticipant);
        EntityManagerUtil.flushAndClearContext(entityManager);

        List<ParticipantResponse> responses = Stream.of(participant, anotherParticipant)
                .map(ParticipantResponse::from)
                .toList();
        ParticipantsResponse expected = ParticipantsResponse.from(responses);

        // when
        ParticipantsResponse response = participantService.findParticipantsWithFilter(authMember1, study2.getId(), null);


        // then
        assertThat(response).usingRecursiveComparison()
                .ignoringExpectedNullFields()
                .isEqualTo(expected);
    }

    @Test
    void 참여하지_않은_스터디에_대해서는_모든_참여자_정보를_조회할_수_없다() {
        // given
        AuthMember authMember = new AuthMember(member1.getId());

        // when, then
        AssertionsForClassTypes.assertThatThrownBy(() ->
                        participantService.findParticipantsWithFilter(authMember, study2.getId(), null))
                .isInstanceOf(AuthorizationException.class);
    }

    @Test
    void 특정_멤버의_참여자_정보자_정보를_조회할_수_있다() {
        // given
        Participant participant = Participant.instantiateParticipantWithContents(study2, member1, "nickname1");
        Participant anotherParticipant = Participant.instantiateParticipantWithContents(study2, member2, "nickname2");
        AuthMember authMember1 = new AuthMember(member1.getId());

        entityManager.persist(participant);
        entityManager.persist(anotherParticipant);
        EntityManagerUtil.flushAndClearContext(entityManager);

        ParticipantsResponse expected = ParticipantsResponse.from(List.of(
                ParticipantResponse.from(participant)
        ));

        // when
        ParticipantsResponse response = participantService.findParticipantsWithFilter(authMember1, study2.getId(), member1.getId());

        // then
        assertThat(response).usingRecursiveComparison()
                .ignoringExpectedNullFields()
                .isEqualTo(expected);
    }

    @Test
    void 자신의_소유가_아닌_참여자_정보는_조회할_수_없다() {
        // given
        Participant participant = Participant.instantiateParticipantWithContents(study2, member1, "nickname1");
        AuthMember authMember = new AuthMember(member2.getId());

        entityManager.persist(participant);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when, then
        assertThatThrownBy(() ->
                participantService.findParticipant(authMember, study2.getId(), participant.getId()))
                .isInstanceOf(AuthorizationException.class);
    }

    @Test
    void 해당_스터디의_참여자가_아니라면_조회할_수_없다() {
        // given
        Participant participant1 = Participant.instantiateParticipantWithContents(study1, member1, "nickname1");
        Participant participant2 = Participant.instantiateParticipantWithContents(study2, member1, "nickname1");
        AuthMember authMember = new AuthMember(member1.getId());

        entityManager.persist(participant1);
        entityManager.persist(participant2);
        EntityManagerUtil.flushAndClearContext(entityManager);

        // when, then
        assertThatThrownBy(() ->
                participantService.findParticipant(authMember, study1.getId(), participant2.getId()))
                .isInstanceOf(ParticipantNotBelongToStudyException.class);
    }

    @Test
    void 스터디에_참여한다() {
        // given
        AuthMember authMember1 = new AuthMember(member1.getId());

        // when
        ParticipateStudyRequest request = new ParticipateStudyRequest(member1.getId(), "nick");
        Long participantId = participantService.participateStudy(authMember1, study2.getId(), request);

        // then
        Participant participant = entityManager.find(Participant.class, participantId);
        assertSoftly(softly -> {
            assertThat(participant.isParticipantOf(study2)).isTrue();
            assertThat(participant.getNickname()).isEqualTo(request.nickname());
            assertThat(participant.getMember().getId()).isEqualTo(request.memberId());
        });
    }
}
