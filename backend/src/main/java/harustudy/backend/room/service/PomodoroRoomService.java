package harustudy.backend.room.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.GenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomsResponse;
import harustudy.backend.room.exception.RoomNotFoundException;
import harustudy.backend.room.repository.ParticipantCodeRepository;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroRoomService {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final ParticipantCodeRepository participantCodeRepository;
    private final MemberRepository memberRepository;
    private final GenerationStrategy generationStrategy;

    public PomodoroRoomResponse findPomodoroRoomWithFilter(Long roomId, String participantCode) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findWithFilter(roomId, participantCode)
                .orElseThrow(RoomNotFoundException::new);
        return PomodoroRoomResponse.from(pomodoroRoom);
    }

    public PomodoroRoomsResponse findPomodoroRoomByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findByMember(member);

        List<PomodoroRoom> pomodoroRooms = mapToPomodoroRooms(pomodoroProgresses);

        return PomodoroRoomsResponse.from(pomodoroRooms);
    }

    private List<PomodoroRoom> mapToPomodoroRooms(List<PomodoroProgress> pomodoroProgresses) {
        return pomodoroProgresses.stream()
                .map(PomodoroProgress::getPomodoroRoom)
                .distinct()
                .toList();
    }

    public CreatePomodoroRoomResponse createPomodoroRoom(CreatePomodoroRoomRequest request) {
        ParticipantCode participantCode = regenerateUniqueCode();
        participantCodeRepository.save(participantCode);

        PomodoroRoom pomodoroRoom = new PomodoroRoom(request.name(), request.totalCycle(),
                request.timePerCycle(), participantCode);
        PomodoroRoom savedRoom = pomodoroRoomRepository.save(pomodoroRoom);

        return CreatePomodoroRoomResponse.from(savedRoom, participantCode);
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
