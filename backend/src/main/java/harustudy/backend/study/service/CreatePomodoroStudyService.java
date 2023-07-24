package harustudy.backend.study.service;

import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.study.domain.Pomodoro;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.dto.CreatePomodoroStudyDto;
import harustudy.backend.study.dto.CreatePomodoroStudyRequest;
import harustudy.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class CreatePomodoroStudyService {

    private final StudyRepository studyRepository;
    private final ParticipantCodeRepository participantCodeRepository;
    private final GenerationStrategy generationStrategy;

    public CreatePomodoroStudyDto createStudy(CreatePomodoroStudyRequest request) {
        ParticipantCode participantCode = regenerateUniqueCode();
        participantCodeRepository.save(participantCode);

        Pomodoro pomodoro = new Pomodoro(request.name(), request.totalCycle(),
                request.timePerCycle(), participantCode);
        Study savedStudy = studyRepository.save(pomodoro);

        return CreatePomodoroStudyDto.from(savedStudy, participantCode);
    }

    // TODO: ParticipantCodeService 분리 고려
    private ParticipantCode regenerateUniqueCode() {
        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
        while (isParticipantCodePresent(participantCode)) {
            participantCode.regenerate();
        }
        return participantCode;
    }

    private boolean isParticipantCodePresent(ParticipantCode participantCode) {
        return participantCodeRepository.findByCode(participantCode.getCode())
                .isPresent();
    }
}
