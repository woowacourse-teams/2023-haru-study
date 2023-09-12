package harustudy.backend.study.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.study.domain.PomodoroStudy;
import harustudy.backend.study.dto.CreatePomodoroStudyRequest;
import harustudy.backend.study.dto.CreatePomodoroStudyResponse;
import harustudy.backend.study.dto.PomodoroStudyResponse;
import harustudy.backend.study.dto.PomodoroStudiesResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
class PomodoroStudyServiceTest {
//
//    @Autowired
//    private PomodoroStudyService pomodoroStudyService;
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Autowired
//    private GenerationStrategy generationStrategy;
//
//    @Test
//    void 룸_아이디로_룸을_조회한다() {
//        // given
//        PomodoroStudy pomodoroStudy = new PomodoroStudy("study", 8, 20);
//        entityManager.persist(pomodoroStudy);
//        entityManager.flush();
//        entityManager.clear();
//
//        // when
//        PomodoroStudyResponse result = pomodoroStudyService.findPomodoroStudy(pomodoroStudy.getId());
//
//        // then
//        assertAll(
//                () -> assertThat(result.studyId()).isEqualTo(pomodoroStudy.getId()),
//                () -> assertThat(result.name()).isEqualTo(pomodoroStudy.getName()),
//                () -> assertThat(result.totalCycle()).isEqualTo(pomodoroStudy.getTotalCycle()),
//                () -> assertThat(result.timePerCycle()).isEqualTo(pomodoroStudy.getTimePerCycle())
//        );
//    }
//
//    @Test
//    void 룸_아이디로_룸_조회시_없으면_예외를_던진다() {
//        // given
//        PomodoroStudy pomodoroStudy = new PomodoroStudy("study", 8, 20);
//        entityManager.persist(pomodoroStudy);
//        entityManager.flush();
//        entityManager.clear();
//
//        // when, then
//        assertThatThrownBy(() -> pomodoroStudyService.findPomodoroStudyWithFilter(99999L, null), null)
//                .isInstanceOf(MemberNotFoundException.class);
//    }
//
//    @Test
//    void 룸을_생성한다() {
//        // given
//        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("study", 8, 40);
//
//        // when
//        CreatePomodoroStudyResponse result = pomodoroStudyService.createPomodoroStudy(request);
//
//        // then
//        assertAll(
//                () -> assertThat(result.studyId()).isNotNull(),
//                () -> assertThat(result.participantCode()).isNotNull()
//        );
//    }
//
//    @Test
//    void 참여코드에_해당하는_룸을_조회한다() {
//        // given
//        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("study", 8, 40);
//        CreatePomodoroStudyResponse response = pomodoroStudyService.createPomodoroStudy(request);
//        String participantCode = response.participantCode();
//
//        // when
//        PomodoroStudiesResponse result = pomodoroStudyService.findPomodoroStudyWithFilter(null,
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
//        PomodoroStudy pomodoroStudy = new PomodoroStudy("study", 8, 40, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(pomodoroStudy);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        ParticipantCode notPersisted = new ParticipantCode(generationStrategy);
//
//        // when, then
//        assertThatThrownBy(
//                () -> pomodoroStudyService.findPomodoroStudyWithFilter(null, notPersisted.getCode()))
//                .isInstanceOf(ParticipantCodeNotFoundException.class);
//    }
//
//    @Test
//    void 참여코드에_해당하는_룸_조회시_참여코드에_해당하는_룸이_없으면_예외를_던진다() {
//        // given
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        PomodoroStudy pomodoroStudy = new PomodoroStudy("study", 8, 40, participantCode);
//        entityManager.persist(participantCode);
//        entityManager.persist(pomodoroStudy);
//
//        ParticipantCode notStudiesCode = new ParticipantCode(generationStrategy);
//        entityManager.persist(notStudiesCode);
//
//        entityManager.flush();
//        entityManager.clear();
//
//        // when, then
//        assertThatThrownBy(
//                () -> pomodoroStudyService.findPomodoroStudyWithFilter(null, notStudiesCode.getCode()))
//                .isInstanceOf(StudyNotFoundException.class);
//    }
}
