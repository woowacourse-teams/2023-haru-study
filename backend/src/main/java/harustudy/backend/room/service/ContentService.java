package harustudy.backend.room.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.common.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.common.EntityNotFoundException.RoomNotFound;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.content.PomodoroContent;
import harustudy.backend.room.domain.progress.PomodoroProgress;
import harustudy.backend.room.dto.content.MemberContentResponse;
import harustudy.backend.room.dto.content.MemberContentResponses;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Transactional
@Service
public class ContentService {

    private final PomodoroRoomRepository pomodoroRoomRepository;
    private final MemberRepository memberRepository;

    public Map<String, String> findCurrentCyclePlan(Long roomId, Long memberId,
                                                    Integer cycle) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(IllegalArgumentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        return pomodoroRoom.findPlanByMemberWithCycle(member, cycle);
    }

    public void writePlan(Long roomId, Long memberId, Map<String, String> plan) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);

        pomodoroRoom.writePlan(member, plan);
    }

    public MemberContentResponses findMemberContent(Long roomId, Long memberId) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository
                .findById(roomId).orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        PomodoroProgress pomodoroProgress = pomodoroRoom.findProgressByMember(member)
                .orElseThrow(PomodoroProgressNotFound::new);

        List<PomodoroContent> pomodoroContents = pomodoroProgress.getPomodoroContents();

        List<MemberContentResponse> memberContentResponses = pomodoroContents.stream()
                .map(MemberContentResponse::from)
                .toList();

        return new MemberContentResponses(memberContentResponses);
    }

    // TODO: 나중에 ID 반환할지 말지 고민해보기
    public void writeRetrospect(Long roomId, Long memberId, Map<String, String> retrospect) {
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(roomId)
                .orElseThrow(RoomNotFound::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);

        pomodoroRoom.writeRetrospect(member, retrospect);
    }
}
