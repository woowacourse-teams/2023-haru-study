package harustudy.backend.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;

import harustudy.backend.entity.GenerationStrategy;
import harustudy.backend.entity.ParticipantCode;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.Study;
import harustudy.backend.repository.StudyRepository;
import harustudy.backend.service.dto.CreatePomodoroStudyRequest;
import harustudy.backend.service.dto.CreatePomodoroStudyResponse;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@ExtendWith(MockitoExtension.class)
class CreatePomodoroStudyServiceTest {

    @Mock
    StudyRepository studyRepository;
    @Mock
    ParticipantCodeRepository participantCodeRepository;
    @Mock
    GenerationStrategy generationStrategy;
    @InjectMocks
    CreatePomodoroStudyService createPomodoroStudyService;

    @Test
    void 스터디_개설시_참여코드가_생성된다() {
        // given
        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("studyName", 1, 20);
        String code = "ABCDEF";

        given(participantCodeRepository.findByCode(anyString())).willReturn(Optional.empty());
        given(generationStrategy.generate()).willReturn(code);

        // when
        CreatePomodoroStudyResponse response = createPomodoroStudyService.createStudy(request);

        // then
        assertThat(response.participantCode()).isEqualTo(code);
    }

    @Test
    void 중복된_참여코드로_스터디가_생성되면_참여_코드가_재생성된다() {
        // given
        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("studyName", 1, 20);
        Study study = new Pomodoro("studyName", 1, 20);
        ParticipantCode participantCode = new ParticipantCode(study, generationStrategy);

        given(participantCodeRepository.findByCode(anyString()))
                .willReturn(Optional.of(participantCode))
                .willReturn(Optional.empty());

        String originalCode = "ABCDEF";
        String regeneratedCode = "BCDEFG";

        given(generationStrategy.generate())
                .willReturn(originalCode, regeneratedCode);

        // when
        CreatePomodoroStudyResponse response = createPomodoroStudyService.createStudy(request);

        // then
        assertThat(response.participantCode()).isNotEqualTo(originalCode);
    }
}
