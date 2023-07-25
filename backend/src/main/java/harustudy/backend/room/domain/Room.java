package harustudy.backend.room.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.MemberProgress;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.exception.DuplicatedNicknameException;
import harustudy.backend.room.exception.RoomNameLengthException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "room_type")
public abstract class Room extends BaseTimeEntity {

    private static final int MIN_NAME_LENGTH = 1;
    private static final int MAX_NAME_LENGTH = 10;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 10)
    private String name;

    @OneToMany(mappedBy = "room", cascade = CascadeType.PERSIST)
    private List<MemberProgress> memberProgresses = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "participant_code_id")
    private ParticipantCode participantCode;

    public Room(@NotNull String name, @NotNull ParticipantCode participantCode) {
        validateName(name);
        this.name = name;
        this.participantCode = participantCode;
    }

    private void validateName(String name) {
        if (name.length() < MIN_NAME_LENGTH || name.length() > MAX_NAME_LENGTH) {
            throw new RoomNameLengthException();
        }
    }

    public boolean isParticipatedMember(Member member) {
        return memberProgresses.stream()
                .anyMatch(memberProgress -> memberProgress.isOwnedBy(member));
    }

    public void participate(Member member) {
        validateDuplicatedNickname(member);
        MemberProgress pomodoroProgress = new PomodoroProgress(this, member);
        memberProgresses.add(pomodoroProgress);
    }

    private void validateDuplicatedNickname(Member member) {
        if (memberProgresses.stream()
                .anyMatch(memberProgress -> memberProgress.hasSameNicknameMember(member))) {
            throw new DuplicatedNicknameException();
        }
    }
}
