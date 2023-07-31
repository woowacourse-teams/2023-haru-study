package harustudy.backend.member.domain;

import harustudy.backend.common.BaseTimeEntity;
import harustudy.backend.member.exception.MemberNameLengthException;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(length = 10)
    private String nickname;

    public Member(@NotNull String nickname) {
        validateLength(nickname);
        this.nickname = nickname;
    }

    private void validateLength(String nickname) {
        if (nickname.length() < 1 || nickname.length() > 10) {
            throw new MemberNameLengthException();
        }
    }

    public boolean hasSameNickname(Member member) {
        return nickname.equals(member.nickname);
    }
}
