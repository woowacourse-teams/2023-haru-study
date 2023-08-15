package harustudy.backend.progress.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.exception.MemberNotParticipatedException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.dto.PomodoroProgressRequest;
import harustudy.backend.progress.dto.PomodoroProgressResponse;
import harustudy.backend.progress.dto.PomodoroProgressesResponse;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.exception.RoomNotFoundException;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class PomodoroProgressService {

    private final MemberRepository memberRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final PomodoroRoomRepository pomodoroRoomRepository;

    public PomodoroProgressResponse findPomodoroProgress(AuthMember authMember, Long studyId, Long progressId) {
        PomodoroProgress pomodoroProgress = findPomodoroProgressOf(authMember, studyId, progressId);
        return PomodoroProgressResponse.from(pomodoroProgress);
    }

    public PomodoroProgressesResponse findPomodoroProgressWithFilter(AuthMember authMember, Long studyId, Long memberId) {
        // TODO: 동적쿼리로 변경(memberId 유무에 따른 분기처리)
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(studyId)
                .orElseThrow(RoomNotFoundException::new);
        Member member = memberRepository.findById(authMember.id())
                .orElseThrow(MemberNotFoundException::new);

        if (Objects.isNull(memberId)) {
            List<PomodoroProgressResponse> responses =
                    pomodoroProgressRepository.findByPomodoroRoom(pomodoroRoom)
                            .stream()
                            .map(PomodoroProgressResponse::from)
                            .collect(Collectors.toList());
            return PomodoroProgressesResponse.from(responses);
        }

        PomodoroProgressResponse response =
                pomodoroProgressRepository.findByPomodoroRoomAndMember(pomodoroRoom, member)
                        .map(PomodoroProgressResponse::from)
                        .orElseThrow(PomodoroProgressNotFoundException::new);
        return PomodoroProgressesResponse.from(List.of(response));
    }

    public void proceed(AuthMember authMember, Long studyId, Long progressId) {
        Member member = memberRepository.findById(authMember.id())
                .orElseThrow(MemberNotFoundException::new);
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findById(progressId)
                .orElseThrow(PomodoroProgressNotFoundException::new);
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(studyId)
                .orElseThrow(RoomNotFoundException::new);

        if (!pomodoroProgress.isOwnedBy(member)) {
            throw new AuthorizationException();
        }

        if (pomodoroProgress.isNotIncludedIn(pomodoroRoom)) {
            throw new ProgressNotBelongToRoomException();
        }
        pomodoroProgress.proceed();
    }

    public Long participateStudy(AuthMember authMember, Long studyId, PomodoroProgressRequest request) {
        Member member = memberRepository.findById(authMember.id())
                .orElseThrow(MemberNotFoundException::new);
        Member requestMember = memberRepository.findById(request.memberId())
                .orElseThrow(MemberNotFoundException::new);
        if (!member.equals(requestMember)) {
            throw new AuthorizationException();
        }
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(studyId)
                .orElseThrow(RoomNotFoundException::new);
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, request.nickname());
        PomodoroProgress saved = pomodoroProgressRepository.save(pomodoroProgress);
        return saved.getId();
    }

    private PomodoroProgress findPomodoroProgressOf(AuthMember authMember, Long studyId, Long progressId) {
        Member member = memberRepository.findById(authMember.id())
                .orElseThrow(MemberNotFoundException::new);
        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(studyId)
                .orElseThrow(RoomNotFoundException::new);
        return pomodoroProgressRepository.findByPomodoroRoomAndMember(pomodoroRoom, member)
                .orElseThrow(MemberNotParticipatedException::new);
    }
}
