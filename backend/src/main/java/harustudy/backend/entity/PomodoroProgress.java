package harustudy.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class PomodoroProgress extends MemberProgress {

    @NotNull
    private Integer currentCycle;

    @Enumerated(value = EnumType.STRING)
    private StudyStatus studyStatus;

    public PomodoroProgress(Study study, Member member, @NotNull Integer currentCycle,
            StudyStatus studyStatus) {
        super(study, member);
        this.currentCycle = currentCycle;
        this.studyStatus = studyStatus;
    }

    public void proceedRetrospect() {
        studyStatus = studyStatus.getNext();
    }

    public boolean isNotStudying() {
        return studyStatus != StudyStatus.STUDYING;
    }
}
