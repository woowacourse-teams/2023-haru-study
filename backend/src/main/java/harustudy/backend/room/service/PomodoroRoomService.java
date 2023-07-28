package harustudy.backend.room.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.MemberDto;
import harustudy.backend.room.dto.RoomAndMembersResponse;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroRoomService {

    private final ParticipantCodeRepository participantCodeRepository;
    private final MemberRepository memberRepository;
    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final GenerationStrategy generationStrategy;

    public CreatePomodoroRoomDto createRoom(CreatePomodoroRoomRequest request) {
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

    public Long participate(Long roomId, String nickname) {
        Member member = memberRepository.save(new Member(nickname));
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(IllegalArgumentException::new);

        pomodoroRoom.participate(member);

        return member.getId();
    }

    public RoomAndMembersResponse findPomodoroRoomMetadata(Long studyId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(studyId)
                .orElseThrow(IllegalArgumentException::new);

        List<MemberDto> members = pomodoroRoom.findMembers();
        if (members.isEmpty()) {
            throw new IllegalArgumentException();
        }

        return new RoomAndMembersResponse(
                pomodoroRoom.getName(),
                pomodoroRoom.getTotalCycle(),
                pomodoroRoom.getTimePerCycle(),
                members
        );
    }
}
