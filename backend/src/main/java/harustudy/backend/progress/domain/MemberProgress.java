package harustudy.backend.progress.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.content.domain.MemberContent;
import harustudy.backend.member.domain.Member;
import harustudy.backend.room.domain.Room;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "progress_type")
@Entity
public abstract class MemberProgress extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "memberProgress")
    private List<MemberContent> memberContents = new ArrayList<>();

    private boolean isDone = false;

    public MemberProgress(Room room, Member member) {
        this.room = room;
        this.member = member;
    }

    public boolean isOwnedBy(Member member) {
        return getMember().equals(member);
    }

    public boolean hasSameNicknameMember(Member member) {
        return getMember().hasSameNickname(member);
    }

    public void setDone() {
        this.isDone = true;
    }
}
