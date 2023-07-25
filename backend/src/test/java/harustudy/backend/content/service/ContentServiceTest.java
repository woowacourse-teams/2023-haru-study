package harustudy.backend.content.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.domain.TemplateVersion;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.progress.exception.StudyProgressException;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.Room;
import java.util.Map;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest(includeFilters = @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE,
        value = ContentService.class))
class ContentServiceTest {

    @Autowired
    private TestEntityManager testEntityManager;
    @Autowired
    private ContentService contentService;

    @Test
    void 계획_단계가_아닐_때_계획을_작성하려_하면_예외를_던진다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        Room room = new PomodoroRoom("studyName", 1, 20, participantCode);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(room, member, 1,
                PomodoroStatus.RETROSPECT);
        PomodoroContent pomodoroRecord = new PomodoroContent(pomodoroProgress, 1, Map.of(),
                Map.of(), TemplateVersion.V1);

        // when
        testEntityManager.persist(participantCode);
        testEntityManager.persist(room);
        testEntityManager.persist(member);
        testEntityManager.persist(pomodoroProgress);
        testEntityManager.persist(pomodoroRecord);

        // then
        assertThatThrownBy(() -> contentService.writePlan(room.getId(),
                member.getId(), Map.of("plan", "abc")))
                .isInstanceOf(StudyProgressException.class);
    }


    @Test
    void 계획이_작성되어_있지_않은_경우_회고를_작성하려_하면_예외를_던진다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        Room room = new PomodoroRoom("studyName", 1, 20, participantCode);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(room, member, 1,
                PomodoroStatus.RETROSPECT);
        PomodoroContent pomodoroRecord = new PomodoroContent(pomodoroProgress, 1, Map.of(),
                Map.of(), TemplateVersion.V1);

        // when
        testEntityManager.persist(participantCode);
        testEntityManager.persist(room);
        testEntityManager.persist(member);
        testEntityManager.persist(pomodoroProgress);
        testEntityManager.persist(pomodoroRecord);

        // then
        assertThatThrownBy(() -> contentService.writeRetrospect(room.getId(),
                member.getId(), Map.of("retrospect", "abc")))
                .isInstanceOf(StudyProgressException.class);
    }

    // TODO: ISSUE #120 으로 해결 예정
//    @Test
//    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회한다() {
//        // given
//        Map<String, String> expectedPlan = Map.of(
//                "toDo", "쿠키와 세션",
//                "completionCondition", "완료조건",
//                "expectedProbability", "80%",
//                "expectedDifficulty", "예상되는 어려움",
//                "whatCanYouDo", "가능성을 높이기 위해 무엇을 할 수 있을지?");
//
//        Map<String, String> expectedRetrospect = Map.of(
//                "doneAsExpected", "예상했던 결과",
//                "experiencedDifficulty", "겪었던 어려움",
//                "lesson", "교훈");
//
//        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
//        Study study = new Pomodoro("studyName", 1, 20, participantCode);
//        Member member = new Member("nickname");
//        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member, 1,
//                StudyStatus.RETROSPECT);
//        PomodoroRecord pomodoroRecord = new PomodoroRecord(pomodoroProgress, 1, expectedPlan,
//                expectedRetrospect, TemplateVersion.V1);
//
//        // when
//        testEntityManager.persist(participantCode);
//        testEntityManager.persist(study);
//        testEntityManager.persist(member);
//        testEntityManager.persist(pomodoroProgress);
//        testEntityManager.persist(pomodoroRecord);
//
//        MemberContentResponses memberContentResponses = proceedPomodoroStudyService.findMemberContent(
//                study.getId(), member.getId());
//
//        MemberContentResponse expectedMemberContentResponse = new MemberContentResponse(1,
//                expectedPlan,
//                expectedRetrospect);
//
//        // when
//        List<MemberContentResponse> content = memberContentResponses.content();
//
//        // then
//        assertThat(content).containsExactly(expectedMemberContentResponse);
//    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회시_스터디가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> contentService.findMemberContent(10L, 1L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회_시_멤버가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> contentService.findMemberContent(1L, 10L))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
