package harustudy.backend.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.PomodoroRecord;
import harustudy.backend.entity.Study;
import harustudy.backend.entity.StudyStatus;
import harustudy.backend.entity.TemplateVersion;
import harustudy.backend.exception.InvalidProgressException;
import harustudy.backend.exception.StudyProgressException;
import java.util.Map;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
        value = ProceedPomodoroStudyService.class))
class ProceedPomodoroStudyServiceTest {

    @Autowired
    private TestEntityManager testEntityManager;
    @Autowired
    private ProceedPomodoroStudyService proceedPomodoroStudyService;

    @Test
    void 계획_단계가_아닐_때_계획을_작성하려_하면_예외를_던진다() {
        // given
        Study study = new Pomodoro("studyName", 1, 20);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member, 1,
                StudyStatus.RETROSPECT);
        PomodoroRecord pomodoroRecord = new PomodoroRecord(pomodoroProgress, 1, Map.of(),
                Map.of(), TemplateVersion.V1);

        // when
        testEntityManager.persist(study);
        testEntityManager.persist(member);
        testEntityManager.persist(pomodoroProgress);
        testEntityManager.persist(pomodoroRecord);

        // then
        assertThatThrownBy(() -> proceedPomodoroStudyService.writePlan(study.getId(),
                member.getId(), Map.of("plan", "abc")))
                .isInstanceOf(StudyProgressException.class);
    }

    @ParameterizedTest
    @EnumSource(value = StudyStatus.class, names = {"PLANNING", "RETROSPECT"})
    void 스터디_중_상태가_아니라면_회고_상태로_넘어갈_수_없다(StudyStatus studyStatus) {
        // given
        Study study = new Pomodoro("studyName", 1, 20);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member, 1,
                studyStatus);

        // when
        testEntityManager.persist(study);
        testEntityManager.persist(member);
        testEntityManager.persist(pomodoroProgress);

        // then
        assertThatThrownBy(() -> proceedPomodoroStudyService.proceedToRetrospect(study.getId(),
                member.getId()))
                .isInstanceOf(InvalidProgressException.UnavailableToProceed.class);
    }

    @Test
    void 계획이_작성되어_있지_않은_경우_회고를_작성하려_하면_예외를_던진다() {
        // given
        Study study = new Pomodoro("studyName", 1, 20);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member, 1,
                StudyStatus.RETROSPECT);
        PomodoroRecord pomodoroRecord = new PomodoroRecord(pomodoroProgress, 1, Map.of(),
                Map.of(), TemplateVersion.V1);

        // when
        testEntityManager.persist(study);
        testEntityManager.persist(member);
        testEntityManager.persist(pomodoroProgress);
        testEntityManager.persist(pomodoroRecord);

        // then
        assertThatThrownBy(() -> proceedPomodoroStudyService.writeRetrospect(study.getId(),
                member.getId(), Map.of("retrospect", "abc")))
                .isInstanceOf(StudyProgressException.class);
    }
}
