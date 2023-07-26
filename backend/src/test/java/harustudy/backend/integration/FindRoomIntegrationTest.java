package harustudy.backend.integration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.content.dto.CurrentCyclePlanResponse;
import harustudy.backend.content.dto.MemberContentResponse;
import harustudy.backend.content.dto.MemberContentResponses;
import harustudy.backend.progress.dto.RoomAndProgressStepResponse;
import harustudy.backend.room.dto.MemberDto;
import harustudy.backend.room.dto.RoomAndMembersResponse;
import java.nio.charset.StandardCharsets;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class FindRoomIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 스터디에_속하는_특정_멤버에_대한_정보를_조회한다() throws Exception {
        // given & when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/members/{memberId}/metadata", room.getId(),
                                member.getId())
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        RoomAndProgressStepResponse response = objectMapper.readValue(jsonResponse,
                RoomAndProgressStepResponse.class);
        // then
        assertThat(response.studyName()).isEqualTo("room");
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/members/{memberId}/content", room.getId(),
                                member.getId())
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        MemberContentResponses responses = objectMapper.readValue(jsonResponse,
                MemberContentResponses.class);

        // then
        MemberContentResponse expectedMemberContentResponse = new MemberContentResponse(1,
                plan,
                retrospect);

        assertThat(responses.content()).containsExactly(expectedMemberContentResponse);
    }

    @Test
    void 스터디_메타데이터_및_참여한_모든_스터디원에_대한_정보를_조회한다() throws Exception {
        // given & when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/metadata", room.getId())
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        RoomAndMembersResponse response = objectMapper.readValue(jsonResponse,
                RoomAndMembersResponse.class);

        // then
        assertAll(
                () -> Assertions.assertThat(response.studyName()).isEqualTo("room"),
                () -> Assertions.assertThat(response.totalCycle()).isEqualTo(3),
                () -> Assertions.assertThat(response.timePerCycle()).isEqualTo(20),
                () -> Assertions.assertThat(response.members()).containsExactly(
                        new MemberDto(member.getId(), member.getNickname()))
        );
    }

    @Test
    void 특정_멤버의_현재_사이클의_계획을_조회한다() throws Exception {
        // given & when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/{studyId}/members/{memberId}/content/plans?cycle=1", room.getId(),
                                member.getId())
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        CurrentCyclePlanResponse response = objectMapper.readValue(jsonResponse,
                CurrentCyclePlanResponse.class);

        // then
        assertAll(
                () -> Assertions.assertThat(response.plan().get("toDo")).isEqualTo("쿠키와 세션"),
                () -> Assertions.assertThat(response.plan().get("completionCondition")).isEqualTo(
                        "완료조건"),
                () -> Assertions.assertThat(response.plan().get("expectedProbability")).isEqualTo(
                        "80%"),
                () -> Assertions.assertThat(response.plan().get("expectedDifficulty")).isEqualTo(
                        "예상되는 어려움"),
                () -> Assertions.assertThat(response.plan().get("whatCanYouDo")).isEqualTo(
                        "가능성을 높이기 위해 무엇을 할 수 있을지?")
        );
    }
}