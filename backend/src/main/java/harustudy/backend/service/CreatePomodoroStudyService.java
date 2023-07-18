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
        Pomodoro pomodoro = new Pomodoro(request.name(), request.totalCycle(),
                request.timePerCycle());
        Study savedStudy = studyRepository.save(pomodoro);

        ParticipantCode participantCode = regenerateUniqueCode(pomodoro);
        participantCodeRepository.save(participantCode);
        return CreatePomodoroStudyDto.from(savedStudy, participantCode);
    }

    private ParticipantCode regenerateUniqueCode(Pomodoro pomodoro) {
        ParticipantCode participantCode = new ParticipantCode(pomodoro, generationStrategy);
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
