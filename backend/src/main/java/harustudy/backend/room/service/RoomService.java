package harustudy.backend.room.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.repository.MemberProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.Room;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.MemberDto;
import harustudy.backend.room.dto.RoomAndMembersResponse;
import harustudy.backend.room.repository.RoomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class RoomService {

    private final ParticipantCodeRepository participantCodeRepository;
    private final MemberProgressRepository<PomodoroProgress> memberProgressRepository;
    private final MemberRepository memberRepository;
    private final RoomRepository roomRepository;
    private final GenerationStrategy generationStrategy;

    public CreatePomodoroRoomDto createRoom(CreatePomodoroRoomRequest request) {
        ParticipantCode participantCode = regenerateUniqueCode();
        participantCodeRepository.save(participantCode);

        PomodoroRoom pomodoroRoom = new PomodoroRoom(request.name(), request.totalCycle(),
                request.timePerCycle(), participantCode);
        Room savedRoom = roomRepository.save(pomodoroRoom);

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

    public Long participate(Long studyId, String nickname) {
        Member member = memberRepository.save(new Member(nickname));
        Room room = roomRepository.findById(studyId)
                .orElseThrow(IllegalArgumentException::new);

        room.participate(member);
        return member.getId();
    }

    public RoomAndMembersResponse findStudyMetadata(Long studyId) {
        Room room = roomRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        List<PomodoroProgress> pomodoroProgresses = memberProgressRepository.findByRoom(room);

        if (pomodoroProgresses.isEmpty()) {
            throw new IllegalArgumentException();
        }

        List<MemberDto> members = pomodoroProgresses.stream()
                .map(pomodoroProgress -> new MemberDto(
                        pomodoroProgress.getMember().getId(),
                        pomodoroProgress.getMember().getNickname()))
                .toList();

        PomodoroRoom pomodoroRoom = (PomodoroRoom) room;

        return new RoomAndMembersResponse(
                pomodoroRoom.getName(),
                pomodoroRoom.getTotalCycle(),
                pomodoroRoom.getTimePerCycle(),
                members
        );
    }
}
