package harustudy.backend.progress.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.dto.RoomAndProgressStepResponse;
import harustudy.backend.progress.exception.InvalidProgressException.UnavailableToProceed;
import harustudy.backend.progress.repository.MemberProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.Room;
import harustudy.backend.room.repository.RoomRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class ProgressService {

    private final MemberProgressRepository<PomodoroProgress> memberProgressRepository;
    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;

    public RoomAndProgressStepResponse findMemberMetaData(Long studyId, Long memberId) {
        Room room = roomRepository.findById(studyId).orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = memberProgressRepository.findByRoomAndMember(
                        room, member)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroRoom pomodoroRoom = (PomodoroRoom) pomodoroProgress.getRoom();

        return new RoomAndProgressStepResponse(pomodoroRoom.getName(), pomodoroRoom.getTotalCycle(),
                pomodoroProgress.getCurrentCycle(),
                pomodoroRoom.getTimePerCycle(), pomodoroProgress.getPomodoroStatus());
    }

    public void proceedToRetrospect(Long studyId, Long memberId) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, memberId);
        validateProgressIsStudying(pomodoroProgress);
        pomodoroProgress.proceed();
    }

    private void validateProgressIsStudying(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotStudying()) {
            throw new UnavailableToProceed();
        }
    }

    private PomodoroProgress findPomodoroProgressFrom(Long studyId, Long memberId) {
        Room room = roomRepository.findById(studyId)
                .orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);
        return memberProgressRepository.findByRoomAndMember(room, member)
                .orElseThrow(PomodoroProgressNotFound::new);
    }
}
