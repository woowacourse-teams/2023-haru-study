package harustudy.backend.member.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.NicknameResponse;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final MemberRepository memberRepository;

    public NicknameResponse findParticipatedMemberNickname(Long roomId, Long memberId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);

        pomodoroRoom.validateParticipated(member);

        return new NicknameResponse(member.getNickname());
    }
}
