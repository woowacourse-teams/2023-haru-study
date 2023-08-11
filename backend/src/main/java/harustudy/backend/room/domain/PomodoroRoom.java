package harustudy.backend.room.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.exception.DuplicatedNicknameException;
import harustudy.backend.room.exception.PomodoroTimePerCycleException;
import harustudy.backend.room.exception.PomodoroTotalCycleException;
import harustudy.backend.room.exception.PomodoroRoomNameLengthException;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroRoom extends BaseTimeEntity {

    private static final int MIN_NAME_LENGTH = 1;
    private static final int MAX_NAME_LENGTH = 10;

    // TODO: 순서 조정
    private final static int MIN_TOTAL_CYCLE = 1;
    private final static int MAX_TOTAL_CYCLE = 8;

    private final static int MIN_TIME_PER_CYCLE = 20;
    private final static int MAX_TIME_PER_CYCLE = 60;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_code_id")
    private ParticipantCode participantCode;

    @NotNull
    @Column(length = 10)
    private String name;

    @NotNull
    private Integer totalCycle;

    @NotNull
    private Integer timePerCycle;

    @OneToMany(mappedBy = "pomodoroRoom", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<PomodoroProgress> pomodoroProgresses = new ArrayList<>();

    public PomodoroRoom(@NotNull String name, @NotNull Integer totalCycle,
                        @NotNull Integer timePerCycle, @NotNull ParticipantCode participantCode) {
        validate(name, totalCycle, timePerCycle);
        this.totalCycle = totalCycle;
        this.timePerCycle = timePerCycle;
        this.name = name;
        this.participantCode = participantCode;
    }

    private void validate(String name, Integer totalCycle, Integer timePerCycle) {
        validateName(name);
        validateTotalCycle(totalCycle);
        validateTimePerCycle(timePerCycle);
    }

    private void validateName(String name) {
        if (name.length() < MIN_NAME_LENGTH || name.length() > MAX_NAME_LENGTH) {
            throw new PomodoroRoomNameLengthException();
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

    public void validateDuplicatedNickname(Member member) {
        if (pomodoroProgresses.stream()
                .anyMatch(memberProgress -> memberProgress.hasSameNicknameMember(member))) {
            throw new DuplicatedNicknameException();
        }
    }

    public PomodoroProgress createProgress(Member member) {
        PomodoroProgress pomodoroProgress = new PomodoroProgress(this, member, totalCycle);
        pomodoroProgresses.add(pomodoroProgress);
        return pomodoroProgress;
    }
}
