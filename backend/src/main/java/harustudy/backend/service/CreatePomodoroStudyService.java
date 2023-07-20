package harustudy.backend.service;

import harustudy.backend.controller.CreatePomodoroStudyRequest;
import harustudy.backend.entity.GenerationStrategy;
import harustudy.backend.entity.ParticipantCode;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.Study;
import harustudy.backend.repository.ParticipantCodeRepository;
import harustudy.backend.repository.StudyRepository;
import harustudy.backend.service.dto.CreatePomodoroStudyDto;
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
