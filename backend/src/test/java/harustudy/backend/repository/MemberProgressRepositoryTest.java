package harustudy.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.Study;
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
    @Autowired
    private StudyRepository studyRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
    void studyId와_memberId로_MemberProgress를_조회한다() {
        // given
        Study study = studyRepository.findById(1L).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(1L)
                .orElseThrow(IllegalArgumentException::new);

        // when
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findByStudyAndMember(
                study, member).get();

        // then
        assertThat(pomodoroProgress.getId()).isEqualTo(1L);
    }

    @Test
    void studyId로_MemberProgress_리스트를_조회한다() {
        // given
        Study study = studyRepository.findById(1L).orElseThrow(IllegalArgumentException::new);

        // when
        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findByStudy(
                study);

        // then
        assertThat(pomodoroProgresses.size()).isEqualTo(2);
    }
}
