package harustudy.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertAll;

import harustudy.backend.dto.response.StudyAuthResponse;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Sql(value = "/data.sql")
@Transactional
class StudyAuthServiceTest {

    @Autowired
    private StudyAuthService studyAuthService;

    @Test
    void 기존_참여멤버의_참여코드를_인증하고_스터디와_멤버_정보를_반환한다() {
        // given
        String existedStudyCode = "ASDFGH";
        Long participatedMemberId = 1L;

        // when
        StudyAuthResponse response = studyAuthService.checkAuthCode(existedStudyCode,
                participatedMemberId);

        // then
        assertAll(
                () -> assertThat(response.studyId()).isEqualTo(1L),
                () -> assertThat(response.studyName()).isEqualTo("Study 1"),
                () -> assertThat(response.nickname()).isEqualTo("member1")
        );
    }

    @Test
    void 신규멤버의_참여코드를_인증하고_스터디_정보를_반환한다() {
        // given
        String existedStudyCode = "ASDFGH";
        Long participatedMemberId = null;

        // when
        StudyAuthResponse response = studyAuthService.checkAuthCode(existedStudyCode,
                participatedMemberId);

        // then
        assertAll(
                () -> assertThat(response.studyId()).isEqualTo(1L),
                () -> assertThat(response.studyName()).isEqualTo("Study 1"),
                () -> assertThat(response.nickname()).isNull()
        );
    }

    @Test
    void 참여코드에_해당하는_스터디가_없으면_예외를_던진다() {
        // given
        String notExistedStudyCode = "VCXWQE";
        Long participatedMemberId = 1L;

        // when & then
        assertThatThrownBy(() -> studyAuthService.checkAuthCode(notExistedStudyCode,
                participatedMemberId))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void 멤버_아이디가_유효하지_않으면_예외를_던진다() {
        // given
        String existedStudyCode = "ASDFGH";
        Long notExistedMemberId = 10L;

        // when & then
        assertThatThrownBy(() -> studyAuthService.checkAuthCode(existedStudyCode,
                notExistedMemberId))
                .isInstanceOf(IllegalArgumentException.class);
    }
}
