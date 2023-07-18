package harustudy.backend.service;

import harustudy.backend.entity.GenerationStrategy;
import harustudy.backend.entity.ParticipantCode;
import harustudy.backend.entity.Pomodoro;
import harustudy.backend.entity.Study;
import harustudy.backend.repository.ParticipantCodeRepository;
import harustudy.backend.repository.StudyRepository;
import harustudy.backend.controller.CreatePomodoroStudyRequest;
import harustudy.backend.service.dto.CreatePomodoroStudyDto;
import java.util.Optional;
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
        Study study = new Pomodoro(request.name(), request.totalCycle(), request.timePerCycle());
        ParticipantCode participantCode = new ParticipantCode(study, generationStrategy);
        Study savedStudy = studyRepository.save(new Pomodoro(request.name(), request.totalCycle(),
                request.timePerCycle()));
        regenerateCodeUntilUnique(participantCode);
        return CreatePomodoroStudyDto.from(savedStudy, participantCode);
    }

    private void regenerateCodeUntilUnique(ParticipantCode participantCode) {
        Optional<ParticipantCode> optionalParticipantCode = participantCodeRepository.findByCode(
                participantCode.getCode());
        while (optionalParticipantCode.isPresent()) {
            participantCode.regenerate();
            optionalParticipantCode = participantCodeRepository.findByCode(
                    participantCode.getCode());
        }
    }
}
