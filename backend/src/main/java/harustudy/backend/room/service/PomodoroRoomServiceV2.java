package harustudy.backend.room.service;

import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.PomodoroRoomResponseV2;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroRoomServiceV2 {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final ParticipantCodeRepository participantCodeRepository;
    private final GenerationStrategy generationStrategy;

    public PomodoroRoomResponseV2 findPomodoroRoom(Long studyId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(studyId)
                .orElseThrow(RoomNotFound::new);
        return PomodoroRoomResponseV2.from(pomodoroRoom);
    }

    public CreatePomodoroRoomDto createPomodoroRoom(CreatePomodoroRoomRequest request) {
        ParticipantCode participantCode = regenerateUniqueCode();
        participantCodeRepository.save(participantCode);

        PomodoroRoom pomodoroRoom = new PomodoroRoom(request.name(), request.totalCycle(),
                request.timePerCycle(), participantCode);
        PomodoroRoom savedRoom = pomodoroRoomRepository.save(pomodoroRoom);

        return CreatePomodoroRoomDto.from(savedRoom, participantCode);
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
