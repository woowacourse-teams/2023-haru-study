package harustudy.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import harustudy.backend.entity.GenerationStrategy;
import harustudy.backend.entity.ParticipantCode;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.repository.ParticipantCodeRepository;
import harustudy.backend.repository.StudyRepository;
import harustudy.backend.service.dto.CreatePomodoroStudyDto;
import harustudy.backend.controller.CreatePomodoroStudyRequest;
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
        Pomodoro pomodoro = new Pomodoro("studyName", 1, 20);

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
        Pomodoro pomodoro = new Pomodoro("studyName", 1, 20);
        ParticipantCode participantCode = new ParticipantCode(pomodoro, generationStrategy);

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
