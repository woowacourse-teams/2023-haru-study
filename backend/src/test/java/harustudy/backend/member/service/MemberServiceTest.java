package harustudy.backend.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.MemberResponse;
import harustudy.backend.member.dto.UnregisterRequest;
import harustudy.backend.testutils.EntityManagerUtil;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @PersistenceContext
    private EntityManager entityManager;

    private Member member1;
    private Member member2;

    @BeforeEach
    void setUp() {
        member1 = new Member("memberName1", "member1@gmail.com", "member1ProfileImageUrl",
                LoginType.GOOGLE);
        member2 = new Member("memberName2", "member2@gmail.com", "member2ProfileImageUrl",
                LoginType.GOOGLE);

        entityManager.persist(member1);
        entityManager.persist(member2);
        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    @Test
    void 인증된_멤버가_자신의_멤버정보를_조회한다() {
        // given
        AuthMember authMember = new AuthMember(member1.getId());

        // when
        MemberResponse foundMember = memberService.findMemberProfile(authMember);

        //then
        assertSoftly(softly -> {
            assertThat(foundMember.memberId()).isEqualTo(member1.getId());
            assertThat(foundMember.name()).isEqualTo(member1.getName());
            assertThat(foundMember.email()).isEqualTo(member1.getEmail());
            assertThat(foundMember.imageUrl()).isEqualTo(member1.getImageUrl());
            assertThat(foundMember.loginType()).isEqualTo(
                    member1.getLoginType().name().toLowerCase());
        });
    }

    @Test
    void 회원_탈퇴를_진행할_수_있다() {
        // given
        AuthMember authMember = new AuthMember(member1.getId());
        UnregisterRequest request = new UnregisterRequest("unregister reason");

        memberService.unregister(authMember, request);

        // when, then
        Member member = entityManager.find(Member.class, member1.getId());
        assertThat(member).isNull();
    }
}
