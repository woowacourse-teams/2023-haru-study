package harustudy.backend.room.service;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.repository.PomodoroContentRepository;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.MemberDto;
import harustudy.backend.room.dto.PomodoroRoomAndMembersResponse;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroRoomService {

    private final ParticipantCodeRepository participantCodeRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final MemberRepository memberRepository;
    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final GenerationStrategy generationStrategy;
    private final PomodoroContentRepository pomodoroContentRepository;

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

    public Long participate(Long roomId, String nickname) {
        Member member = memberRepository.save(new Member(nickname));
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(IllegalArgumentException::new);
        pomodoroRoom.validateDuplicatedNickname(member);

        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member);
        pomodoroProgressRepository.save(pomodoroProgress);

        int totalCycle = pomodoroRoom.getTotalCycle();
        for (int i = 1; i <= totalCycle; i++) {
            PomodoroContent content = new PomodoroContent(pomodoroProgress, i);
            pomodoroContentRepository.save(content);
        }
        return member.getId();
    }

    public PomodoroRoomAndMembersResponse findPomodoroRoomMetadata(Long roomId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId).orElseThrow(IllegalArgumentException::new);
        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findByPomodoroRoom(pomodoroRoom);

        if (pomodoroProgresses.isEmpty()) {
            throw new IllegalArgumentException();
        }

        List<MemberDto> members = pomodoroProgresses.stream()
                .map(pomodoroProgress -> new MemberDto(
                        pomodoroProgress.getMember().getId(),
                        pomodoroProgress.getMember().getNickname()))
                .toList();

        return new PomodoroRoomAndMembersResponse(
                pomodoroRoom.getName(),
                pomodoroRoom.getTotalCycle(),
                pomodoroRoom.getTimePerCycle(),
                members
        );
    }
}
