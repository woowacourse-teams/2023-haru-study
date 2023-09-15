package harustudy.backend.participant.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.content.domain.Content;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.exception.NicknameLengthException;
import harustudy.backend.study.domain.Study;
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
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

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

    @NotNull
    private Integer currentCycle;

    @Enumerated(value = EnumType.STRING)
    private Step step;

    public Participant(Study study, Member member, String nickname) {
        this.study = study;
        this.member = member;
        this.nickname = nickname;
        this.currentCycle = 1;
        this.step = Step.PLANNING;

        validateNicknameLength(nickname);
    }

    private void validateNicknameLength(String nickname) {
        if (nickname.length() < 1 || nickname.length() > 10) {
            throw new NicknameLengthException();
        }
    }

    public void generateContents(int totalCycle) {
        for (int cycle = 1; cycle <= totalCycle; cycle++) {
            Content content = new Content(this, cycle);
            contents.add(content);
        }
    }

    public void proceed() {
        // TODO: 서비스로 뺄지 말지(일관성을 위해)
        if (step.equals(Step.RETROSPECT)) {
            if (currentCycle.equals(study.getTotalCycle())) {
                step = Step.DONE;
                return;
            }
            currentCycle++;
        }
        step = step.getNext();
    }

    public boolean isParticipantOf(Study study) {
        return this.study.getId().equals(study.getId());
    }

    public boolean isOwnedBy(Member member) {
        return this.member.getId().equals(member.getId());
    }

    public boolean hasSameNicknameWith(Participant participant) {
        return this.nickname.equals(participant.nickname);
    }

    public boolean isRetrospect() {
        return step == Step.RETROSPECT;
    }

    public boolean isNotPlanning() {
        return step != Step.PLANNING;
    }

    public boolean isNotRetrospect() {
        return step != Step.RETROSPECT;
    }

    public boolean isNotIncludedIn(Study other) {
        return !study.getId().equals(other.getId());
    }
}
