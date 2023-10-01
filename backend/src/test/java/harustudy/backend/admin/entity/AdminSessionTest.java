package harustudy.backend.admin.entity;

import harustudy.backend.admin.exception.AdminSessionExpiredException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class AdminSessionTest {

    @Test
    void 세션이_만료되었다면_예외를_발생시킨다() throws NoSuchFieldException, IllegalAccessException {
        // given
        AdminSession adminSession = new AdminSession();

        // when
        Field expiredDateTime = adminSession.getClass()
                .getDeclaredField("expiredDateTime");

        expiredDateTime.setAccessible(true);
        expiredDateTime.set(adminSession, LocalDateTime.now().minus(1L, ChronoUnit.MINUTES));

        // then
        assertThatThrownBy(adminSession::validateIsExpired)
                .isInstanceOf(AdminSessionExpiredException.class);
    }

    @Test
    void 세션이_만료되지_않았다면_예외를_발생시키지_않는다() throws NoSuchFieldException, IllegalAccessException {
        // given
        AdminSession adminSession = new AdminSession();

        // when
        Field expiredDateTime = adminSession.getClass()
                .getDeclaredField("expiredDateTime");

        expiredDateTime.setAccessible(true);
        expiredDateTime.set(adminSession, LocalDateTime.now().plus(1L, ChronoUnit.MINUTES));

        // then
        assertThatCode(adminSession::validateIsExpired)
                .doesNotThrowAnyException();
    }
}
