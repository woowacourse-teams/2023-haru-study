package harustudy.backend.member.domain;

import harustudy.backend.common.BaseTimeEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Objects;
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

    private String name;

    private String email;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private LoginType loginType;

    public Member(String name, String email, String imageUrl, LoginType loginType) {
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        this.loginType = loginType;
    }

    public static Member guest() {
        return new Member("guest", null, null, LoginType.GUEST);
    }

    public Member updateUserInfo(String name, String email, String imageUrl) {
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
        return this;
    }

    public boolean isDifferentMember(Member other) {
        return !this.equals(other);
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        if (other == null || getClass() != other.getClass()) {
            return false;
        }
        Member otherMember = (Member) other;
        return getId().equals(otherMember.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
