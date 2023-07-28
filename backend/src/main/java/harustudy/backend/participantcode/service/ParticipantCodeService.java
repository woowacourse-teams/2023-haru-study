package harustudy.backend.participantcode.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.dto.FindRoomAndNicknameResponse;
import harustudy.backend.participantcode.dto.FindRoomResponse;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: @Transactional(readonly = true)
@RequiredArgsConstructor
@Transactional
@Service
public class ParticipantCodeService {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final ParticipantCodeRepository participantCodeRepository;
    private final MemberRepository memberRepository;

    public FindRoomAndNicknameResponse findRoomByCodeWithMemberId(String code, Long memberId) {
        ParticipantCode participantCode = participantCodeRepository.findByCode(code)
                .orElseThrow(IllegalArgumentException::new);
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByParticipantCode(participantCode);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        if (!pomodoroRoom.isParticipatedMember(member)) {
            throw new IllegalArgumentException();
        }
        return new FindRoomAndNicknameResponse(pomodoroRoom.getId(), pomodoroRoom.getName(), member.getNickname());
    }

    public FindRoomResponse findRoomByCode(String code) {
        ParticipantCode participantCode = participantCodeRepository.findByCode(code)
                .orElseThrow(IllegalArgumentException::new);
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findByParticipantCode(participantCode);
        return new FindRoomResponse(pomodoroRoom.getId(), pomodoroRoom.getName());
    }
}
