package harustudy.backend.participantcode.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.dto.FindRoomAndNicknameResponse;
import harustudy.backend.participantcode.dto.FindRoomResponse;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.domain.PomodoroRoom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
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
class ParticipantCodeServiceTest {

    @Autowired
    private ParticipantCodeService participantCodeService;
    @PersistenceContext
    private EntityManager entityManager;

    @Test
    void 기존_참여멤버의_참여코드를_인증하고_스터디와_멤버_정보를_반환한다() {
        // given
        ParticipantCode code = new ParticipantCode(new CodeGenerationStrategy());
        entityManager.persist(code);

        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 3, 20, code);
        entityManager.persist(pomodoroRoom);

        Member member = new Member("nickname");
        entityManager.persist(member);

        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member);
        entityManager.persist(pomodoroProgress);

        entityManager.flush();
        entityManager.clear();
        // when
        FindRoomAndNicknameResponse response = participantCodeService.findRoomByCodeWithMemberId(
                code.getCode(), member.getId());

        // then
        assertAll(
                () -> assertThat(response.studyName()).isEqualTo("roomName"),
                () -> assertThat(response.nickname()).isEqualTo("nickname")
        );
    }

    @Test
    void 신규멤버의_참여코드를_인증하고_스터디_정보를_반환한다() {
        // given
        ParticipantCode code = new ParticipantCode(new CodeGenerationStrategy());
        entityManager.persist(code);

        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 3, 20, code);
        entityManager.persist(pomodoroRoom);

        // when
        FindRoomResponse response = participantCodeService.findRoomByCode(
                code.getCode());

        // then
        assertThat(response.studyName()).isEqualTo("roomName");
    }

    @Test
    void 참여코드가_없으면_예외를_던진다() {
        // given, when, then
        assertThatThrownBy(() -> participantCodeService.findRoomByCodeWithMemberId("FFFFFF",
                1L))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 멤버_아이디가_유효하지_않으면_예외를_던진다() {
        // given
        ParticipantCode code = new ParticipantCode(new CodeGenerationStrategy());
        entityManager.persist(code);

        PomodoroRoom pomodoroRoom = new PomodoroRoom("roomName", 3, 20, code);
        entityManager.persist(pomodoroRoom);

        // when & then
        assertThatThrownBy(() -> participantCodeService.findRoomByCodeWithMemberId(code.getCode(),
                1L))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
