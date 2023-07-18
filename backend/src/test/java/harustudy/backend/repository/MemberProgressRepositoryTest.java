package harustudy.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.entity.PomodoroProgress;
import java.util.List;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest
@Sql("/data.sql")
class MemberProgressRepositoryTest {

    @Autowired
    private MemberProgressRepository<PomodoroProgress> pomodoroProgressRepository;

    @Test
    void studyId와_memberId로_MemberProgress를_조회한다() {
        // given
        Long studyId = 1L;
        Long memberId = 1L;

        // when
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByStudyIdAndMemberId(
                studyId, memberId).get();

        // then
        assertThat(pomodoroProgress.getId()).isEqualTo(1L);
    }

    @Test
    void studyId로_MemberProgress_리스트를_조회한다() {
        // given
        Long studyId = 1L;

        // when
        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findByStudyId(
                studyId);

        // then
        assertThat(pomodoroProgresses.size()).isEqualTo(2);
    }
}
