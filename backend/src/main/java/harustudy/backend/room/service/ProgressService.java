package harustudy.backend.room.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.progress.PomodoroProgress;
import harustudy.backend.room.dto.progress.RoomAndProgressStepResponse;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class ProgressService {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final MemberRepository memberRepository;

    public RoomAndProgressStepResponse findMemberMetaData(Long roomId, Long memberId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = pomodoroRoom.findProgressByMember(member)
                .orElseThrow(IllegalArgumentException::new);

        return new RoomAndProgressStepResponse(pomodoroRoom.getName(), pomodoroRoom.getTotalCycle(),
                pomodoroProgress.getCurrentCycle(),
                pomodoroRoom.getTimePerCycle(), pomodoroProgress.getPomodoroStatus());
    }

    public void proceedToRetrospect(Long roomId, Long memberId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);

        pomodoroRoom.proceedToRetrospect(member);
    }
}
