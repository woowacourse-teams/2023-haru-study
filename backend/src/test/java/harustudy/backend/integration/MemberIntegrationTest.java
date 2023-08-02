package harustudy.backend.integration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.GuestRegisterRequest;
import harustudy.backend.member.dto.MemberResponseV2;
import harustudy.backend.member.dto.MembersResponseV2;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.room.domain.PomodoroRoom;
import jakarta.servlet.http.Cookie;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class MemberIntegrationTest extends IntegrationTest {

    private ParticipantCode participantCode;
    private PomodoroRoom room;
    private Member member1;
    private Member member2;
    private PomodoroProgress pomodoroProgress1;
    private PomodoroProgress pomodoroProgress2;
    private PomodoroContent pomodoroContent1;
    private PomodoroContent pomodoroContent2;

    @BeforeEach()
    void setUp() {
        super.setUp();

        participantCode = new ParticipantCode(new CodeGenerationStrategy());
        room =
                new PomodoroRoom("roomName", 1, 20, participantCode);

        member1 = new Member("member1");
        member2 = new Member("member2");
        pomodoroProgress1 = new PomodoroProgress(room, member1);
        pomodoroProgress2 = new PomodoroProgress(room, member2);
        pomodoroContent1 = new PomodoroContent(pomodoroProgress1, 1);
        pomodoroContent2 = new PomodoroContent(pomodoroProgress2, 1);

        entityManager.persist(participantCode);
        entityManager.persist(room);
        entityManager.persist(member1);
        entityManager.persist(member2);
        entityManager.persist(pomodoroProgress1);
        entityManager.persist(pomodoroProgress2);
        entityManager.persist(pomodoroContent1);
        entityManager.persist(pomodoroContent2);
    }

    @Test
    void 멤버를_조회할_수_있다() throws Exception {
        // given
        MemberResponseV2 expected = new MemberResponseV2(member1.getId(), member1.getNickname());

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/v2/members/{memberId}", member1.getId()))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        MemberResponseV2 response = objectMapper.readValue(jsonResponse, MemberResponseV2.class);

        // then
        assertThat(response).isEqualTo(expected);
    }

    @Test
    void 스터디에_참여한_멤버들을_조회할_수_있다() throws Exception {
        // given
        MemberResponseV2 expectedValue1 = new MemberResponseV2(member1.getId(),
                member1.getNickname());
        MemberResponseV2 expectedValue2 = new MemberResponseV2(member2.getId(),
                member2.getNickname());
        MembersResponseV2 expectedResponses = new MembersResponseV2(
                List.of(expectedValue1, expectedValue2));

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/v2/members")
                                .param("studyId", String.valueOf(room.getId())))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        MembersResponseV2 response = objectMapper.readValue(jsonResponse, MembersResponseV2.class);

        // then
        assertThat(response.members()).hasSize(2);
        assertThat(response.members().get(0).nickname()).isEqualTo("member1");
        assertThat(response.members().get(1).nickname()).isEqualTo("member2");

    }

    @Test
    void 스터디에_신규_멤버를_등록한다() throws Exception {
        // given
        GuestRegisterRequest request = new GuestRegisterRequest(room.getId(), "member3");
        String body = objectMapper.writeValueAsString(request);

        // when
        MvcResult result = mockMvc.perform(
                        post("/api/v2/members/guest")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(body))
                .andExpect(status().isCreated())
                .andReturn();

        String createdUri = result.getResponse().getHeader("Location");
        Cookie cookie = result.getResponse().getCookie("memberId");

        // then
        assertAll(
                () -> assertThat(createdUri).contains("/api/v2/members/"),
                () -> assertThat(cookie).isNotNull(),
                () -> assertThat(cookie.getValue()).isNotNull()
        );
    }
}
