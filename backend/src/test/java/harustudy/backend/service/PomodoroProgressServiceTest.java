package harustudy.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.dto.MemberContentResponse;
import harustudy.backend.dto.MemberDto;
import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberContentResponses;
import harustudy.backend.dto.response.MemberStudyMetaDataResponse;
import harustudy.backend.dto.response.StudyMetadataResponse;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Sql(value = "/data.sql")
@Transactional
class PomodoroProgressServiceTest {

    @Autowired
    private PomodoroProgressService pomodoroProgressService;

    @Test
    void 특정_멤버의_현재_사이클의_계획을_조회한다() {
        // given
        CurrentCyclePlanResponse currentCyclePlan = pomodoroProgressService.findCurrentCyclePlan(
                1, 1L, 1L);

        // when & then
        assertAll(
                () -> assertThat(currentCyclePlan.plan().get("toDo")).isEqualTo("쿠키와 세션"),
                () -> assertThat(currentCyclePlan.plan().get("completionCondition")).isEqualTo(
                        "완료조건"),
                () -> assertThat(currentCyclePlan.plan().get("expectedProbability")).isEqualTo(
                        "80%"),
                () -> assertThat(currentCyclePlan.plan().get("expectedDifficulty")).isEqualTo(
                        "예상되는 어려움"),
                () -> assertThat(currentCyclePlan.plan().get("whatCanYouDo")).isEqualTo(
                        "가능성을 높이기 위해 무엇을 할 수 있을지?")
        );
    }

    @Test
    void 스터디에_속하는_특정_멤버에_대한_정보를_조회한다() {
        // given
        MemberStudyMetaDataResponse memberMetaData = pomodoroProgressService.findMemberMetaData(
                1L, 1L);

        // when & then
        assertAll(
                () -> assertThat(memberMetaData.studyName()).isEqualTo("Study 1"),
                () -> assertThat(memberMetaData.totalCycle()).isEqualTo(4),
                () -> assertThat(memberMetaData.currentCycle()).isEqualTo(1),
                () -> assertThat(memberMetaData.timePerCycle()).isEqualTo(30),
                () -> assertThat(memberMetaData.step()).isEqualTo("STUDYING")
        );
    }

    @Test
    void 스터디_메타데이터_및_참여한_모든_스터디원에_대한_정보를_조회한다() {
        // given
        StudyMetadataResponse response = pomodoroProgressService.findStudyMetadata(1L);

        // when & then
        assertAll(
                () -> assertThat(response.studyName()).isEqualTo("Study 1"),
                () -> assertThat(response.totalCycle()).isEqualTo(4),
                () -> assertThat(response.timePerCycle()).isEqualTo(30),
                () -> assertThat(response.members()).containsExactly(
                        new MemberDto(1L, "member1"),
                        new MemberDto(2L, "member2"))
        );
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회한다() {
        // given
        MemberContentResponses memberContentResponses = pomodoroProgressService.findMemberContent(
                1L, 1L);

        Map<String, String> expectedPlan = Map.of(
                "toDo", "쿠키와 세션",
                "completionCondition", "완료조건",
                "expectedProbability", "80%",
                "expectedDifficulty", "예상되는 어려움",
                "whatCanYouDo", "가능성을 높이기 위해 무엇을 할 수 있을지?");

        Map<String, String> expectedRetrospect = Map.of(
                "doneAsExpected", "예상했던 결과",
                "experiencedDifficulty", "겪었던 어려움",
                "lesson", "교훈");

        MemberContentResponse expectedMemberContentResponse = new MemberContentResponse(1,
                expectedPlan,
                expectedRetrospect);

        // when
        List<MemberContentResponse> content = memberContentResponses.content();

        // then
        assertThat(content).containsExactly(expectedMemberContentResponse);
    }

    @Test
    void 특정_멤버의_현재_사이클의_계획_조회_시_스터디가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> pomodoroProgressService.findCurrentCyclePlan(1, 10L, 1L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 특정_멤버의_현재_사이클의_계획_조회_시_멤버가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> pomodoroProgressService.findCurrentCyclePlan(1, 1L, 10L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디에_속하는_특정_멤버에_대한_정보를_조회_시_스터디가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> pomodoroProgressService.findMemberMetaData(10L, 1L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디에_속하는_특정_멤버에_대한_정보를_조회_시_멤버가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> pomodoroProgressService.findMemberMetaData(1L, 10L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디_메타데이터_및_참여한_모든_스터디원에_대한_정보를_조회_시_스터디가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> pomodoroProgressService.findStudyMetadata(10L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회시_스터디가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> pomodoroProgressService.findMemberContent(10L, 1L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회_시_멤버가_없으면_예외를_던진다() {
        // given & when & then
        assertThatThrownBy(() -> pomodoroProgressService.findMemberContent(1L, 10L))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
