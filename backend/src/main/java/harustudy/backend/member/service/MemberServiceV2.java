package harustudy.backend.member.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.repository.PomodoroContentRepository;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.GuestRegisterRequest;
import harustudy.backend.member.dto.MemberResponseV2;
import harustudy.backend.member.dto.MembersResponseV2;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberServiceV2 {

    private final MemberRepository memberRepository;
    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final PomodoroContentRepository pomodoroContentRepository;

    public MemberResponseV2 findMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);
        return MemberResponseV2.from(member);
    }

    public MembersResponseV2 findParticipatedMembers(Long roomId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFound::new);
        List<PomodoroProgress> pomodoroProgresses =
                pomodoroProgressRepository.findAllByPomodoroRoomFetchMember(pomodoroRoom);
        List<MemberResponseV2> memberResponses = pomodoroProgresses.stream()
                .map(PomodoroProgress::getMember)
                .map(MemberResponseV2::from)
                .toList();
        return new MembersResponseV2(memberResponses);
    }

    public Long register(GuestRegisterRequest request) {
        Member member = memberRepository.save(new Member(request.nickname()));
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(request.studyId())
                .orElseThrow(RoomNotFound::new);
        Integer totalCycle = pomodoroRoom.getTotalCycle();

        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.save(
                new PomodoroProgress(pomodoroRoom, member));
        for (int i = 1; i <= totalCycle; i++) {
            pomodoroContentRepository.save(new PomodoroContent(pomodoroProgress, i));
        }
        return member.getId();
    }
}
