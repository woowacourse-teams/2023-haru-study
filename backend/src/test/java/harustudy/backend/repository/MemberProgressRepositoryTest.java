package harustudy.backend.repository;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.StudyStatus;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@DataJpaTest
class MemberProgressRepositoryTest {

    @Autowired
    private MemberProgressRepository<PomodoroProgress> memberProgressRepository;
    @Autowired
    private StudyRepository studyRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private TestEntityManager testEntityManager;

    @Test
    void Study와_Member를_통해_MemberProgress를_조회할_수_있다() {
        // given
        Member member = new Member("member");
        Pomodoro study = new Pomodoro("studyName", 1, 20);
        studyRepository.save(study);
        memberRepository.save(member);
        // when
        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member, 1,
                StudyStatus.STUDYING);
        memberProgressRepository.save(pomodoroProgress);

        testEntityManager.flush();
        testEntityManager.clear();
        // then
        Optional<PomodoroProgress> found = memberProgressRepository.findByStudyAndMember(
                study, member);
        assertThat(found).isPresent();
        assertThat(found.get().getStudy().getName()).isEqualTo(study.getName());
    }
}
