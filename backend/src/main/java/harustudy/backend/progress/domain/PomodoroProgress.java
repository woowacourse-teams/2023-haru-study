package harustudy.backend.progress.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.member.domain.Member;
import harustudy.backend.progress.exception.NicknameLengthException;
import harustudy.backend.room.domain.PomodoroRoom;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

    @OneToMany(mappedBy = "pomodoroProgress", cascade = CascadeType.PERSIST)
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
            throw new NicknameLengthException();
        }
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

    public boolean isProgressOf(PomodoroRoom pomodoroRoom) {
        return this.pomodoroRoom.getId().equals(pomodoroRoom.getId());
    }

    public boolean isOwnedBy(Member member) {
        return this.member.getId().equals(member.getId());
    }

    public boolean hasSameNicknameWith(PomodoroProgress pomodoroProgress) {
        return this.nickname.equals(pomodoroProgress.nickname);
    }

    public boolean isRetrospect() {
        return pomodoroStatus == PomodoroStatus.RETROSPECT;
    }

    public boolean isNotPlanning() {
        return pomodoroStatus != PomodoroStatus.PLANNING;
    }

    public boolean isNotRetrospect() {
        return pomodoroStatus != PomodoroStatus.RETROSPECT;
    }

    public boolean isNotIncludedIn(PomodoroRoom other) {
        return !pomodoroRoom.getId().equals(other.getId());
    }
}
