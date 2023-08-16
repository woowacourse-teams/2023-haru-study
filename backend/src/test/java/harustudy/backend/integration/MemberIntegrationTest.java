package harustudy.backend.integration;

import harustudy.backend.auth.config.TokenConfig;
import harustudy.backend.auth.util.JwtTokenProvider;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.MemberResponse;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.domain.CodeGenerationStrategy;
import harustudy.backend.room.domain.ParticipantCode;
import harustudy.backend.room.domain.PomodoroRoom;
import java.nio.charset.StandardCharsets;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MvcResult;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class MemberIntegrationTest extends IntegrationTest {

    private PomodoroRoom room;
    private Member member1;
    private Member member2;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private TokenConfig tokenConfig;

    @BeforeEach
    void setUp() {
        super.setUp();

        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        room = new PomodoroRoom("roomName", 1, 20, participantCode);

        member1 = new Member("member1", "email", "image", LoginType.GUEST);
        member2 = new Member("member2", "email", "image", LoginType.GUEST);
        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(room, member1, "name1");
        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(room, member2, "name2");

        entityManager.persist(participantCode);
        entityManager.persist(room);
        entityManager.persist(member1);
        entityManager.persist(member2);
        entityManager.persist(pomodoroProgress1);
        entityManager.persist(pomodoroProgress2);
    }

    @Test
    void 멤버를_조회할_수_있다() throws Exception {
        // given
        LoginResponse loginResponse = 구글_로그인("member");
        Long requestMemberId = Long.valueOf(jwtTokenProvider.parseSubject(loginResponse.tokenResponse().accessToken(), tokenConfig.secretKey()));

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/members/{memberId}", requestMemberId)
                                .header(HttpHeaders.AUTHORIZATION, loginResponse.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        MemberResponse response = objectMapper.readValue(jsonResponse, MemberResponse.class);

        assertThat(response.memberId()).isEqualTo(requestMemberId);
    }
}
