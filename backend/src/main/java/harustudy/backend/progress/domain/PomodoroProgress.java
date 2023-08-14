package harustudy.backend.progress.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNameLengthException;
import harustudy.backend.room.domain.PomodoroRoom;
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
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

// TODO: 연관관계 편의 메소드 생성(memberContents에 넣는)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroProgress extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pomodoro_room_id")
    private PomodoroRoom pomodoroRoom;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "pomodoroProgress")
    private List<PomodoroContent> pomodoroContents = new ArrayList<>();

    private String nickname;

    @NotNull
    private Integer currentCycle;

    @Enumerated(value = EnumType.STRING)
    private PomodoroStatus pomodoroStatus;

    public PomodoroProgress(PomodoroRoom pomodoroRoom, Member member, String nickname) {
        this.pomodoroRoom = pomodoroRoom;
        this.member = member;
        this.nickname = nickname;
        this.currentCycle = 1;
        this.pomodoroStatus = PomodoroStatus.PLANNING;

        validateNicknameLength(nickname);
    }

    private void validateNicknameLength(String nickname) {
    if (nickname.length() < 1 || nickname.length() > 10) {
        throw new MemberNameLengthException();
    }
    }

    public boolean isOwnedBy(Member member) {
        return getMember().equals(member);
    }

    public boolean hasSameNicknameWith(PomodoroProgress pomodoroProgress) {
        return this.nickname.equals(pomodoroProgress.nickname);
    }

    public PomodoroContent findPomodoroRecordByCycle(Integer cycle) {
        return getPomodoroContents().stream()
                .filter(pomodoro -> pomodoro.getCycle().equals(cycle))
                .findAny()
                .orElseThrow(IllegalArgumentException::new);
    }

    public void proceed() {
        // TODO: 서비스로 뺄지 말지(일관성을 위해)
        if (pomodoroStatus.equals(PomodoroStatus.RETROSPECT)) {
            if (currentCycle.equals(pomodoroRoom.getTotalCycle())) {
                pomodoroStatus = PomodoroStatus.DONE;
                return;
            }
            currentCycle++;
        }
        pomodoroStatus = pomodoroStatus.getNext();
    }

    public boolean isRetrospect() {
        return pomodoroStatus == PomodoroStatus.RETROSPECT;
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
