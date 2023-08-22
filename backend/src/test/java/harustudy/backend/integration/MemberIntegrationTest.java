package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class MemberIntegrationTest extends IntegrationTest {

    private PomodoroRoom room;
    private MemberDto memberDto1;
    private MemberDto memberDto2;

    @BeforeEach
    void setUp() {
        super.setUp();

        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        room = new PomodoroRoom("roomName", 1, 20, participantCode);

        memberDto1 = createMember("member1");
        memberDto2 = createMember("member2");

        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(room, memberDto1.member(),
                "name1");
        PomodoroProgress pomodoroProgress2 = new PomodoroProgress(room, memberDto2.member(),
                "name2");

        entityManager.persist(participantCode);
        entityManager.persist(room);
        entityManager.persist(pomodoroProgress1);
        entityManager.persist(pomodoroProgress2);
    }

    @Test
    void 멤버를_조회할_수_있다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(
                        get("/api/me")
                                .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        MemberResponse response = objectMapper.readValue(jsonResponse, MemberResponse.class);

        assertThat(response.memberId()).isEqualTo(memberDto1.member().getId());
    }
}
