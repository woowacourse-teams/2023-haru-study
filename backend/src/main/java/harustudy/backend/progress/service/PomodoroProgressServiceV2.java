package harustudy.backend.progress.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.exception.MemberNotParticipatedException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.dto.PomodoroProgressResponseV2;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.exception.RoomNotFoundException;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroProgressServiceV2 {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final MemberRepository memberRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;

    public PomodoroProgressResponseV2 findProgress(Long roomId, Long memberId) {
        PomodoroProgress pomodoroProgress = findPomodoroProgress(roomId, memberId);
        return PomodoroProgressResponseV2.from(pomodoroProgress);
    }

    public void proceed(Long roomId, Long progressId) {
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findById(progressId)
                .orElseThrow(PomodoroProgressNotFoundException::new);
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        if (!pomodoroProgress.getPomodoroRoom().equals(pomodoroRoom)) {
            throw new ProgressNotBelongToRoomException();
        }
        pomodoroProgress.proceedV2();
    }

    private PomodoroProgress findPomodoroProgress(Long roomId, Long memberId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
        return pomodoroProgressRepository.findByPomodoroRoomAndMember(
                        pomodoroRoom, member)
                .orElseThrow(MemberNotParticipatedException::new);
    }
}
