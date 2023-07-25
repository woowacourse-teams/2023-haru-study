package harustudy.backend.progress.domain;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.member.domain.Member;
import harustudy.backend.room.domain.Room;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

// TODO: 연관관계 편의 메소드 생성(memberContents에 넣는)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroProgress extends MemberProgress {

    @NotNull
    private Integer currentCycle = 1;

    @Enumerated(value = EnumType.STRING)
    private PomodoroStatus pomodoroStatus = PomodoroStatus.PLANNING;

    public PomodoroProgress(Room room, Member member) {
        super(room, member);
    }

    // TODO: 없애기
    public PomodoroProgress(Room room, Member member, @NotNull Integer currentCycle,
            PomodoroStatus pomodoroStatus) {
        super(room, member);
        this.currentCycle = currentCycle;
        this.pomodoroStatus = pomodoroStatus;
    }

    public PomodoroContent findPomodoroRecordByCycle(Integer cycle) {
        return getMemberContents().stream()
                .filter(pomodoro -> ((PomodoroContent) pomodoro).getCycle().equals(cycle))
                .map(record -> (PomodoroContent) record)
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }

    public List<PomodoroContent> getPomodoroRecords() {
        return getMemberContents().stream()
                .map(record -> (PomodoroContent) record)
                .toList();
    }

    public void proceed() {
        pomodoroStatus = pomodoroStatus.getNext();
    }

    public boolean isNotPlanning() {
        return pomodoroStatus != PomodoroStatus.PLANNING;
    }

    public boolean isNotStudying() {
        return pomodoroStatus != PomodoroStatus.STUDYING;
    }

    public boolean isNotRetrospect() {
        return pomodoroStatus != PomodoroStatus.RETROSPECT;
    }
}
