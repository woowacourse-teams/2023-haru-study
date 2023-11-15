package harustudy.backend.integration;

import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.domain.RefreshToken;
import harustudy.backend.auth.domain.oauth.OauthClients;
import harustudy.backend.auth.util.JwtTokenProvider;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import io.jsonwebtoken.Clock;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import java.util.Date;


@DisplayNameGeneration(ReplaceUnderscores.class)
@AutoConfigureMockMvc
@Transactional
@SpringBootTest
class IntegrationTest {

    @PersistenceContext
    protected EntityManager entityManager;

    @Autowired
    protected ObjectMapper objectMapper;

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenConfig tokenConfig;

    @MockBean
    protected OauthClients oauthClients;

    @MockBean
    protected Clock customClock;

    @Autowired
    protected GenerationStrategy generationStrategy;

    @BeforeEach
    void setUp() {
        when(customClock.now()).thenReturn(new Date());
    }

    protected MemberDto createMember(String name) {
        Member member = generateAndSaveMemberNamedWith(name);
        when(customClock.now()).thenReturn(new Date());
        String accessToken = jwtTokenProvider.createAccessToken(String.valueOf(member.getId()),
                tokenConfig.accessTokenExpireLength(), tokenConfig.secretKey());
        RefreshToken refreshToken = generateAndSaveRefreshTokenOf(member);
        Cookie cookie = new Cookie("refreshToken", refreshToken.getUuid().toString());
        return new MemberDto(member, accessToken, cookie);
    }

    protected Member generateAndSaveMemberNamedWith(String name) {
        Member member = new Member(name, "email", "imageUrl", LoginType.GOOGLE);
        entityManager.persist(member);
        return member;
    }

    protected RefreshToken generateAndSaveRefreshTokenOf(Member member) {
        RefreshToken refreshToken = new RefreshToken(member,
                tokenConfig.refreshTokenExpireLength());
        entityManager.persist(refreshToken);
        return refreshToken;
    }
}
