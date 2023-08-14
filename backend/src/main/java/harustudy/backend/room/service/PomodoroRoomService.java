//package harustudy.backend.room.service;
//
//import harustudy.backend.room.domain.GenerationStrategy;
//import harustudy.backend.room.domain.ParticipantCode;
//import harustudy.backend.room.exception.ParticipantCodeNotFoundException;
//import harustudy.backend.room.repository.ParticipantCodeRepository;
//import harustudy.backend.room.domain.PomodoroRoom;
//import harustudy.backend.room.dto.CreatePomodoroRoomDto;
//import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
//import harustudy.backend.room.dto.PomodoroRoomResponseV2;
//import harustudy.backend.room.exception.RoomNotFoundException;
//import harustudy.backend.room.repository.PomodoroRoomRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//@RequiredArgsConstructor
//@Transactional
//@Service
//public class PomodoroRoomServiceV2 {
//
//    private final PomodoroRoomRepository pomodoroRoomRepository;
//    private final ParticipantCodeRepository participantCodeRepository;
//    private final GenerationStrategy generationStrategy;
//
//    public PomodoroRoomResponseV2 findPomodoroRoom(Long roomId) {
//        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
//                .orElseThrow(RoomNotFoundException::new);
//        return PomodoroRoomResponseV2.from(pomodoroRoom);
//    }
//
//    public CreatePomodoroRoomDto createPomodoroRoom(CreatePomodoroRoomRequest request) {
//        ParticipantCode participantCode = regenerateUniqueCode();
//        participantCodeRepository.save(participantCode);
//
//        PomodoroRoom pomodoroRoom = new PomodoroRoom(request.name(), request.totalCycle(),
//                request.timePerCycle(), participantCode);
//        PomodoroRoom savedRoom = pomodoroRoomRepository.save(pomodoroRoom);
//
//        return CreatePomodoroRoomDto.from(savedRoom, participantCode);
//    }
//
//    private ParticipantCode regenerateUniqueCode() {
//        ParticipantCode participantCode = new ParticipantCode(generationStrategy);
//        while (isParticipantCodePresent(participantCode)) {
//            participantCode.regenerate();
//        }
//        return participantCode;
//    }
//
//    private boolean isParticipantCodePresent(ParticipantCode participantCode) {
//        return participantCodeRepository.findByCode(participantCode.getCode())
//                .isPresent();
//    }
//
//    public PomodoroRoomResponseV2 findPomodoroRoomByParticipantCode(String code) {
//        ParticipantCode participantCode = participantCodeRepository.findByCode(code)
//                .orElseThrow(ParticipantCodeNotFoundException::new);
//        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByParticipantCode(participantCode)
//                .orElseThrow(RoomNotFoundException::new);
//        return PomodoroRoomResponseV2.from(pomodoroRoom);
//    }
//}
