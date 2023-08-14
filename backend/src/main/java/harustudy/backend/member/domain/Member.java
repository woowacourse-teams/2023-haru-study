package harustudy.backend.member.domain;

import harustudy.backend.common.BaseTimeEntity;
import jakarta.persistence.*;
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
}
