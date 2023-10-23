package harustudy.backend.study.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.participant.exception.ParticipantIsNotHostException;
import harustudy.backend.study.domain.Study;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class StudyServiceTest {
//
    @Autowired
    private StudyService studyService;
    @Autowired
    private EntityManager entityManager;
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

    @Test
    void 방장이_아니라면_스터디_단계를_넘길_수_없다() {
        // given
        Study study = new Study("name", 1, 20);
        Member hostMember = Member.guest();
        Member participantMember = Member.guest();

        Participant host = Participant
                .instantiateParticipantWithContents(study, hostMember, "host");
        Participant participant = Participant
                .instantiateParticipantWithContents(study, participantMember, "notHost");

        entityManager.persist(study);
        entityManager.persist(hostMember);
        entityManager.persist(participantMember);
        entityManager.persist(host);
        entityManager.persist(participant);

        entityManager.flush();
        entityManager.clear();

        // when, then
        assertThatThrownBy(() -> studyService.proceed(new AuthMember(participantMember.getId()), study.getId()))
                .isInstanceOf(ParticipantIsNotHostException.class);
    }

    @Test
    void 방장이라면_스터디_단계를_넘길_수_있다() {
        // given
        Study study = new Study("name", 1, 20);
        Member hostMember = Member.guest();
        Member participantMember = Member.guest();

        Participant host = Participant
                .instantiateParticipantWithContents(study, hostMember, "host");
        Participant participant = Participant
                .instantiateParticipantWithContents(study, participantMember, "notHost");

        entityManager.persist(study);
        entityManager.persist(hostMember);
        entityManager.persist(participantMember);
        entityManager.persist(host);
        entityManager.persist(participant);

        entityManager.flush();
        entityManager.clear();

        // when
        studyService.proceed(new AuthMember(host.getId()), study.getId());

        // then
        Study foundStudy = entityManager.find(Study.class, study.getId());
        assertThat(foundStudy.getStep()).isEqualTo(Step.PLANNING);
    }
}
