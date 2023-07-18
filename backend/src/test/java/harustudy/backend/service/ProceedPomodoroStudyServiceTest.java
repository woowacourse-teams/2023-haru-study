package harustudy.backend.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.entity.Study;
import harustudy.backend.entity.StudyStatus;
import harustudy.backend.exception.InvalidProgressException;
import harustudy.backend.repository.MemberProgressRepository;
import harustudy.backend.repository.MemberRepository;
import harustudy.backend.repository.StudyRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@ExtendWith(MockitoExtension.class)
class ProceedPomodoroStudyServiceTest {

    @Mock
    private StudyRepository studyRepository;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private MemberProgressRepository<PomodoroProgress> memberProgressRepository;
    @InjectMocks
    private ProceedPomodoroStudyService proceedPomodoroStudyService;

    @ParameterizedTest
    @EnumSource(value = StudyStatus.class, names = {"PLANNING", "RETROSPECT"})
    void 스터디_중_상태가_아니라면_회고_상태로_넘어갈_수_없다(StudyStatus studyStatus) {
        // givenR
        Long studyId = 1L;
        Long memberId = 1L;
        Study study = new Pomodoro("studyName", 1, 20);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(study, member, 1,
                studyStatus);

        given(studyRepository.findById(anyLong())).willReturn(Optional.of(study));
        given(memberRepository.findById(anyLong())).willReturn(Optional.of(member));
        given(memberProgressRepository.findByStudyAndMember(study, member)).willReturn(
                Optional.of(pomodoroProgress));
        // when, then
        assertThatThrownBy(() -> proceedPomodoroStudyService.proceedToRetrospect(studyId, memberId))
                .isInstanceOf(InvalidProgressException.UnavailableToProceed.class);
    }
}
