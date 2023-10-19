package harustudy.backend.admin.service;

import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.exception.AdminNotFoundException;
import harustudy.backend.admin.exception.SessionNotFoundException;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

import static org.assertj.core.api.Assertions.*;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class AdminAuthServiceTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private AdminAuthService adminAuthService;

    @BeforeEach
    void setUp() {
        entityManager.createNativeQuery("INSERT INTO admin (id, account, password)" +
                        " VALUES (:id, :account, :password)")
                .setParameter("id", 1L)
                .setParameter("account", "test")
                .setParameter("password", "1234")
                .executeUpdate();
    }

    @Test
    void 로그인을_할_수_있다() {
        // given
        AdminLoginRequest request = new AdminLoginRequest("test", "1234");

        // when
        UUID sessionId = adminAuthService.login(request);

        // then
        assertThat(sessionId).isNotNull();
    }

    @Test
    void 아이디가_다르면_로그인_시_예외가_발생한다() {
        // given
        AdminLoginRequest request = new AdminLoginRequest("nonexists", "1234");

        // when, then
        assertThatThrownBy(() -> adminAuthService.login(request))
                .isInstanceOf(AdminNotFoundException.class);
    }

    @Test
    void 비밀번호가_다르면_로그인_시_예외가_발생한다() {
        // given
        AdminLoginRequest request = new AdminLoginRequest("test", "nonexists");

        // when, then
        assertThatThrownBy(() -> adminAuthService.login(request))
                .isInstanceOf(AdminNotFoundException.class);
    }

    @Test
    void 로그인에_성공하면_세션이_생성된다() {
        // given
        AdminLoginRequest request = new AdminLoginRequest("test", "1234");

        // when
        UUID sessionId = adminAuthService.login(request);

        // then
        assertThatCode(() -> adminAuthService.validateSession(sessionId))
                .doesNotThrowAnyException();
    }

    @Test
    void 로그인을_하지_않았다면_세션_조회_시_예외가_발생한다() {
        // given
        UUID sessionId = UUID.randomUUID();

        // when, then
        assertThatThrownBy(() -> adminAuthService.validateSession(sessionId))
                .isInstanceOf(SessionNotFoundException.class);
    }
}
