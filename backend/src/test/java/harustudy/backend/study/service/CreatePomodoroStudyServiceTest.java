package harustudy.backend.study.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.study.domain.Pomodoro;
import harustudy.backend.study.dto.CreatePomodoroStudyDto;
import harustudy.backend.study.dto.CreatePomodoroStudyRequest;
import harustudy.backend.study.repository.StudyRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@ExtendWith(MockitoExtension.class)
class CreatePomodoroStudyServiceTest {

    @Mock
    private StudyRepository studyRepository;
    @Mock
    private ParticipantCodeRepository participantCodeRepository;
    @Mock
    private GenerationStrategy generationStrategy;
    @InjectMocks
    private CreatePomodoroStudyService createPomodoroStudyService;

    @Test
    void 스터디_개설시_참여코드가_생성된다() {
        // given
        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("studyName", 1, 20);
        Pomodoro pomodoro = new Pomodoro("studyName", 1, 20,
                new ParticipantCode(generationStrategy));

        String code = "ABCDEF";

        given(studyRepository.save(any(Pomodoro.class))).willReturn(pomodoro);
        given(participantCodeRepository.findByCode(anyString())).willReturn(Optional.empty());
        given(generationStrategy.generate()).willReturn(code);

        // when
        CreatePomodoroStudyDto response = createPomodoroStudyService.createStudy(request);

        // then
        assertThat(response.participantCode()).isEqualTo(code);
    }

    @Test
    void 중복된_참여코드로_스터디가_생성되면_참여_코드가_재생성된다() {
        // given
        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("studyName", 1, 20);
        Pomodoro pomodoro = new Pomodoro("studyName", 1, 20,
                new ParticipantCode(generationStrategy));
        ParticipantCode participantCode = new ParticipantCode(generationStrategy);

        String originalCode = "ABCDEF";
        String regeneratedCode = "BCDEFG";

        given(studyRepository.save(any(Pomodoro.class))).willReturn(pomodoro);
        given(participantCodeRepository.findByCode(anyString()))
                .willReturn(Optional.of(participantCode))
                .willReturn(Optional.empty());
        given(generationStrategy.generate())
                .willReturn(originalCode, regeneratedCode);

        // when
        CreatePomodoroStudyDto response = createPomodoroStudyService.createStudy(request);

        // then
        assertThat(response.participantCode()).isNotEqualTo(originalCode);
    }
}
