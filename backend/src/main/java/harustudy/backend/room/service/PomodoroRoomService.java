package harustudy.backend.room.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.InMemoryParticipantCodeRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomsResponse;
import harustudy.backend.room.exception.ParticipantCodeNotFoundException;
import harustudy.backend.room.exception.RoomNotFoundException;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroRoomService {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final MemberRepository memberRepository;
    private final GenerationStrategy generationStrategy;
    private final InMemoryParticipantCodeRepository participantCodeRepository;

    public PomodoroRoomResponse findPomodoroRoom(Long roomId) {
        return PomodoroRoomResponse.from(pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new));
    }

    public PomodoroRoomsResponse findPomodoroRoomWithFilter(Long memberId, String code) {
        if (Objects.nonNull(code)) {
            ParticipantCode participantCode = participantCodeRepository.findByCode(code)
                    .orElseThrow(ParticipantCodeNotFoundException::new);
            Long pomodoroRoomId = participantCode.getPomodoroRoomId();
            PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByIdIfExists(pomodoroRoomId);
            return PomodoroRoomsResponse.from(List.of(pomodoroRoom));
        }
        if (Objects.nonNull(memberId)) {
            return findPomodoroRoomByMemberId(memberId);
        }

        return PomodoroRoomsResponse.from(pomodoroRoomRepository.findAll());
    }

    private PomodoroRoomsResponse findPomodoroRoomByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findByMember(member);

        List<PomodoroRoom> pomodoroRooms = mapToPomodoroRooms(pomodoroProgresses);

        return PomodoroRoomsResponse.from(pomodoroRooms);
    }

    private List<PomodoroRoom> mapToPomodoroRooms(List<PomodoroProgress> pomodoroProgresses) {
        return pomodoroProgresses.stream()
                .map(PomodoroProgress::getPomodoroRoom)
                .toList();
    }

    public CreatePomodoroRoomResponse createPomodoroRoom(CreatePomodoroRoomRequest request) {
        PomodoroRoom pomodoroRoom = new PomodoroRoom(request.name(), request.totalCycle(),
                request.timePerCycle());
        PomodoroRoom savedRoom = pomodoroRoomRepository.save(pomodoroRoom);
        ParticipantCode participantCode = generateUniqueCode(pomodoroRoom.getId());
        participantCodeRepository.save(participantCode);

        return CreatePomodoroRoomResponse.from(savedRoom, participantCode);
    }

    private ParticipantCode generateUniqueCode(Long pomodoroRoomId) {
        ParticipantCode participantCode = new ParticipantCode(pomodoroRoomId, generationStrategy);
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
