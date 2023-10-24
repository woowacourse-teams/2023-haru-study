package harustudy.backend.participant.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.content.domain.Content;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.exception.NicknameLengthException;
import harustudy.backend.study.domain.Study;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

// TODO: 연관관계 편의 메소드 생성(memberContents에 넣는)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Participant extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "participant", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Content> contents = new ArrayList<>();

    private String nickname;

    private Boolean isHost;

    private Participant(Study study, Member member, String nickname, Boolean isHost) {
        this.study = study;
        this.member = member;
        this.nickname = nickname;
        this.isHost = isHost;
    }

    public static Participant of(Study study, Member member, String nickname) {
        validateNicknameLength(nickname);
        Participant participant = new Participant(study, member, nickname, study.hasEmptyParticipants());
        study.addParticipant(participant);
        return participant;
    }

    private static void validateNicknameLength(String nickname) {
        if (nickname.isEmpty() || nickname.length() > 10) {
            throw new NicknameLengthException();
        }
    }

    public void generateContents(int totalCycle) {
        for (int cycle = 1; cycle <= totalCycle; cycle++) {
            Content content = new Content(this, cycle);
            contents.add(content);
        }
    }

    public boolean isParticipantOf(Study study) {
        return this.study.getId().equals(study.getId());
    }

    public boolean isNotCreatedBy(Member member) {
        return this.member.getId().equals(member.getId());
    }

    public boolean hasSameNicknameWith(Participant participant) {
        return this.nickname.equals(participant.nickname);
    }

    public boolean isNotIncludedIn(Study other) {
        return !study.getId().equals(other.getId());
    }
}
