package harustudy.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberStudyMetaDataResponse;
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
@Sql("/data.sql")
@Transactional
class PomodoroProgressServiceTest {

    @Autowired
    private PomodoroProgressService pomodoroProgressService;

    @Test
    void 특정_멤버의_현재_사이클의_계획을_조회한다() {
        // given
        CurrentCyclePlanResponse currentCyclePlan = pomodoroProgressService.findCurrentCyclePlanByStudyIdAndMemberIdAndCycle(
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
        MemberStudyMetaDataResponse memberMetaData = pomodoroProgressService.findMemberMetaDataByStudyIdAndMemberId(
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
}
