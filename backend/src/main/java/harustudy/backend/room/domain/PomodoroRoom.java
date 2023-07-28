package harustudy.backend.room.domain;

import harustudy.backend.common.EntityNotFoundException.PomodoroProgressNotFound;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotParticipatedException;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.progress.PomodoroProgress;
import harustudy.backend.room.dto.MemberDto;
import harustudy.backend.room.exception.DuplicatedNicknameException;
import harustudy.backend.room.exception.PomodoroTimePerCycleException;
import harustudy.backend.room.exception.PomodoroTotalCycleException;
import harustudy.backend.room.exception.RoomNameLengthException;
import harustudy.backend.room.exception.progress.InvalidProgressException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroRoom {

    private final static int MIN_TOTAL_CYCLE = 1;
    private final static int MAX_TOTAL_CYCLE = 8;
    private final static int MIN_TIME_PER_CYCLE = 20;
    private final static int MAX_TIME_PER_CYCLE = 40;

    private static final int MIN_NAME_LENGTH = 1;
    private static final int MAX_NAME_LENGTH = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 10)
    private String name;

    @OneToMany(mappedBy = "pomodoroRoom", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PomodoroProgress> pomodoroProgresses = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_code_id")
    private ParticipantCode participantCode;

    @NotNull
    private Integer totalCycle;

    @NotNull
    private Integer timePerCycle;

    public PomodoroRoom(@NotNull String name, @NotNull Integer totalCycle,
                        @NotNull Integer timePerCycle, @NotNull ParticipantCode participantCode) {
        validateName(name);
        validateTotalCycle(totalCycle);
        validateTimePerCycle(timePerCycle);
        this.name = name;
        this.participantCode = participantCode;
        this.totalCycle = totalCycle;
        this.timePerCycle = timePerCycle;
    }

    private void validateName(String name) {
        if (name.length() < MIN_NAME_LENGTH || name.length() > MAX_NAME_LENGTH) {
            throw new RoomNameLengthException();
        }
    }

    private void validateTotalCycle(Integer totalCycle) {
        if (totalCycle < MIN_TOTAL_CYCLE || totalCycle > MAX_TOTAL_CYCLE) {
            throw new PomodoroTotalCycleException();
        }
    }

    private void validateTimePerCycle(Integer timePerCycle) {
        if (timePerCycle < MIN_TIME_PER_CYCLE || timePerCycle > MAX_TIME_PER_CYCLE) {
            throw new PomodoroTimePerCycleException();
        }
    }

    public boolean isParticipatedMember(Member member) {
        return pomodoroProgresses.stream()
                .anyMatch(memberProgress -> memberProgress.isOwnedBy(member));
    }

    public void participate(Member member) {
        validateDuplicatedNickname(member);
        PomodoroProgress pomodoroProgress = new PomodoroProgress(this, member);
        pomodoroProgress.createContents(totalCycle);
        pomodoroProgresses.add(pomodoroProgress);
    }

    private void validateDuplicatedNickname(Member member) {
        if (pomodoroProgresses.stream()
                .anyMatch(pomodoroProgress -> pomodoroProgress.hasSameNicknameMember(member))) {
            throw new DuplicatedNicknameException();
        }
    }

    public List<MemberDto> findMembers() {
        return pomodoroProgresses.stream()
                .map(pomodoroProgress -> new MemberDto(
                        pomodoroProgress.getMember().getId(),
                        pomodoroProgress.getMember().getNickname()))
                .toList();
    }

    public Optional<PomodoroProgress> findProgressByMember(Member member) {
        return pomodoroProgresses.stream()
                .filter(progress -> progress.getMember().equals(member))
                .findAny();
    }

    public void proceedToRetrospect(Member member) {
        PomodoroProgress pomodoroProgress = findProgressByMember(member)
                .orElseThrow();
        validateProgressIsStudying(pomodoroProgress);
        pomodoroProgress.proceed();
    }

    private void validateProgressIsStudying(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotStudying()) {
            throw new InvalidProgressException.UnavailableToProceed();
        }
    }

    public Map<String, String> findPlanByMemberWithCycle(Member member, Integer cycle) {
        PomodoroProgress pomodoroProgress = findProgressByMember(member)
                .orElseThrow(PomodoroProgressNotFound::new);

        return pomodoroProgress.findPomodoroContentByCycle(cycle).getPlan();
    }

    public void writePlan(Member member, Map<String, String> plan) {
        PomodoroProgress pomodoroProgress = findProgressByMember(member)
                .orElseThrow(PomodoroProgressNotFound::new);
        pomodoroProgress.writePlan(plan);
    }

    public void writeRetrospect(Member member, Map<String, String> retrospect) {
        PomodoroProgress pomodoroProgress = findProgressByMember(member)
                .orElseThrow(PomodoroProgressNotFound::new);
        pomodoroProgress.writeRetrospect(retrospect);
    }

    public void validateParticipated(Member member) {
        findProgressByMember(member)
                .orElseThrow(MemberNotParticipatedException::new);
    }
}
