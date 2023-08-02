package harustudy.backend.member.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.GuestRegisterRequest;
import harustudy.backend.member.dto.MemberResponseV2;
import harustudy.backend.member.dto.MembersResponseV2;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.domain.PomodoroRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
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
class MemberServiceV2Test {

    @PersistenceContext
    EntityManager entityManager;
    @Autowired
    MemberServiceV2 memberServiceV2;

    @Test
    void 멤버_아이디로_멤버_엔티티를_조회한다() {
        // given
        Member member = new Member("member1");
        entityManager.persist(member);
        entityManager.flush();
        entityManager.clear();

        // when
        MemberResponseV2 response = memberServiceV2.findMember(member.getId());

        // then
        assertAll(
                () -> assertThat(response.id()).isEqualTo(member.getId()),
                () -> assertThat(response.nickname()).isEqualTo(member.getNickname())
        );
    }

    @Test
    void 방_아이디로_해당_방에_참여한_멤버들을_모두_조회한다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        PomodoroRoom room =
                new PomodoroRoom("roomName", 1, 20, participantCode);

        Member member1 = new Member("member1");
        Member member2 = new Member("member2");
        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(room, member1);
        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(room, member2);
        PomodoroContent pomodoroContent1 = new PomodoroContent(pomodoroProgress1, 1);
        PomodoroContent pomodoroContent2 = new PomodoroContent(pomodoroProgress2, 1);

        entityManager.persist(participantCode);
        entityManager.persist(room);
        entityManager.persist(member1);
        entityManager.persist(member2);
        entityManager.persist(pomodoroProgress1);
        entityManager.persist(pomodoroProgress2);
        entityManager.persist(pomodoroContent1);
        entityManager.persist(pomodoroContent2);

        // when
        MembersResponseV2 response = memberServiceV2.findParticipatedMembers(room.getId());

        // then
        assertAll(
                () -> assertThat(response.members().size()).isEqualTo(2),
                () -> assertThat(response.members().get(0).nickname()).isEqualTo("member1"),
                () -> assertThat(response.members().get(1).nickname()).isEqualTo("member2")
        );
    }

    @Test
    void 스터디_아이디와_닉네임으로_스터디에_멤버를_등록한다() {
        // given
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        PomodoroRoom room =
                new PomodoroRoom("roomName", 3, 20, participantCode);
        entityManager.persist(participantCode);
        entityManager.persist(room);
        GuestRegisterRequest request = new GuestRegisterRequest(room.getId(), "nickname");

        // when
        Long memberId = memberServiceV2.register(request);

        // then
        entityManager.flush();
        entityManager.clear();

        Member registeredMember = entityManager.find(Member.class, memberId);
        PomodoroRoom registeredPomodoroRoom = entityManager.find(PomodoroRoom.class, room.getId());
        List<PomodoroProgress> pomodoroProgresses = registeredPomodoroRoom.getPomodoroProgresses();
        PomodoroProgress registeredPomodoroProgress = pomodoroProgresses.get(0);
        List<PomodoroContent> pomodoroContents = registeredPomodoroProgress.getPomodoroContents();

        assertAll(
                () -> assertThat(registeredMember.getNickname()).isEqualTo("nickname"),
                () -> assertThat(registeredPomodoroRoom.getName()).isEqualTo("roomName"),
                () -> assertThat(pomodoroProgresses.size()).isEqualTo(1),
                () -> assertThat(pomodoroContents.size()).isEqualTo(3)
        );
    }
}