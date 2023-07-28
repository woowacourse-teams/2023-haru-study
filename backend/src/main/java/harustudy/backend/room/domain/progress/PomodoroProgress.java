package harustudy.backend.room.domain.progress;

import harustudy.backend.member.domain.Member;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.content.PomodoroContent;
import harustudy.backend.room.exception.progress.InvalidProgressException;
import harustudy.backend.room.exception.progress.StudyProgressException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

// TODO: 연관관계 편의 메소드 생성(memberContents에 넣는)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pomodoro_room_id")
    private PomodoroRoom pomodoroRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "pomodoroProgress", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PomodoroContent> pomodoroContents = new ArrayList<>();

    private boolean isDone = false;

    @NotNull
    private Integer currentCycle;

    @Enumerated(value = EnumType.STRING)
    private PomodoroStatus pomodoroStatus;

    public PomodoroProgress(PomodoroRoom pomodoroRoom, Member member) {
        this.pomodoroRoom = pomodoroRoom;
        this.member = member;
        this.currentCycle = 1;
        this.pomodoroStatus = PomodoroStatus.PLANNING;
    }

    public PomodoroProgress(PomodoroRoom pomodoroRoom, Member member, Integer currentCycle, PomodoroStatus pomodoroStatus) {
        this.pomodoroRoom = pomodoroRoom;
        this.member = member;
        this.currentCycle = currentCycle;
        this.pomodoroStatus = pomodoroStatus;
    }

    public void createContents(Integer totalCycle) {
        for (int i = 1; i <= totalCycle; i++) {
            PomodoroContent pomodoroContent = new PomodoroContent(this, i);
            pomodoroContents.add(pomodoroContent);
        }
    }

    public void writePlan(Map<String, String> plan) {
        validateProgressIsPlanning();

        PomodoroContent pomodoroContent = findPomodoroContentByCycle(currentCycle);

        proceed();
        pomodoroContent.changePlan(plan);
    }

    public void writeRetrospect(Map<String, String> retrospect) {
        validateProgressIsRetrospect();
        validateIsPlanFilled();

        PomodoroContent pomodoroContent = findPomodoroContentByCycle(currentCycle);

        proceed();
        pomodoroContent.changeRetrospect(retrospect);
    }

    private void validateProgressIsPlanning() {
        if (isNotPlanning()) {
            throw new StudyProgressException();
        }
    }

    public PomodoroContent findPomodoroContentByCycle(Integer cycle) {
        return getPomodoroContents().stream()
                .filter(pomodoro -> pomodoro.isCycle(cycle))
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }

    public void proceed() {
        pomodoroStatus = pomodoroStatus.getNext();
    }

    private void validateProgressIsRetrospect() {
        if (isNotRetrospect()) {
            throw new InvalidProgressException.UnavailableToProceed(); // TODO: 예외 세분화
        }
    }

    private void validateIsPlanFilled() {
        PomodoroContent pomodoroContent = findPomodoroContentByCycle(currentCycle);
        if (pomodoroContent.getPlan().isEmpty()) {
            throw new StudyProgressException();
        }
    }

    public List<PomodoroContent> getPomodoroContents() {
        return pomodoroContents;
    }

    public boolean isOwnedBy(Member member) {
        return getMember().equals(member);
    }

    public boolean hasSameNicknameMember(Member member) {
        return getMember().hasSameNickname(member);
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
