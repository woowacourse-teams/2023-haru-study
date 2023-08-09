package harustudy.backend.member.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.NicknameResponse;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.exception.RoomNotFoundException;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Deprecated
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final MemberRepository memberRepository;

    public NicknameResponse findParticipatedMemberNickname(Long roomId, Long memberId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFoundException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);

        if (pomodoroRoom.isParticipatedMember(member)) {
            return new NicknameResponse(member.getNickname());
        }
        return new NicknameResponse(null);
    }
}
