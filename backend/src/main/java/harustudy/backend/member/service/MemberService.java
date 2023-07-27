package harustudy.backend.member.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.NicknameResponse;
import harustudy.backend.member.exception.MemberNotParticipatedException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.repository.MemberProgressRepository;
import harustudy.backend.room.domain.Room;
import harustudy.backend.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final RoomRepository roomRepository;
    private final MemberRepository memberRepository;
    private final MemberProgressRepository<PomodoroProgress> pomodoroProgressRepository;

    public NicknameResponse findParticipatedMemberNickname(Long roomId, Long memberId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);

        pomodoroProgressRepository.findByRoomAndMember(room, member)
                .orElseThrow(MemberNotParticipatedException::new);

        return new NicknameResponse(member.getNickname());
    }
}
