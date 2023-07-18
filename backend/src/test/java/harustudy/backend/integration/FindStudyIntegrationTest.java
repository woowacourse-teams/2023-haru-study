package harustudy.backend.integration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.dto.MemberContentResponse;
import harustudy.backend.dto.MemberDto;
import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.dto.response.MemberContentResponses;
import harustudy.backend.dto.response.MemberStudyMetaDataResponse;
import harustudy.backend.dto.response.StudyMetadataResponse;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Sql("/data.sql")
public class FindStudyIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 스터디에_속하는_특정_멤버에_대한_정보를_조회한다() throws Exception {
        // given & when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/1/members/1/metadata")
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        MemberStudyMetaDataResponse response = objectMapper.readValue(jsonResponse,
                MemberStudyMetaDataResponse.class);
        // then
        assertThat(response.studyName()).isEqualTo("Study 1");
    }

    @Test
    void 스터디에_참여한_특정_스터디원의_콘텐츠를_조회한다() throws Exception {
        // given
        Map<String, String> expectedPlan = Map.of(
                "toDo", "쿠키와 세션",
                "completionCondition", "완료조건",
                "expectedProbability", "80%",
                "expectedDifficulty", "예상되는 어려움",
                "whatCanYouDo", "가능성을 높이기 위해 무엇을 할 수 있을지?");

        Map<String, String> expectedRetrospect = Map.of(
                "doneAsExpected", "예상했던 결과",
                "experiencedDifficulty", "겪었던 어려움",
                "lesson", "교훈");

        MemberContentResponse expectedMemberContentResponse = new MemberContentResponse(1,
                expectedPlan,
                expectedRetrospect);

        // when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/1/members/1/content")
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        System.out.println(jsonResponse);
        MemberContentResponses responses = objectMapper.readValue(jsonResponse,
                MemberContentResponses.class);

        // then
        assertThat(responses.content()).containsExactly(expectedMemberContentResponse);
    }

    @Test
    void 스터디_메타데이터_및_참여한_모든_스터디원에_대한_정보를_조회한다() throws Exception {
        // given & when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/1/metadata")
                                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        StudyMetadataResponse response = objectMapper.readValue(jsonResponse,
                StudyMetadataResponse.class);

        // then
        assertAll(
                () -> Assertions.assertThat(response.studyName()).isEqualTo("Study 1"),
                () -> Assertions.assertThat(response.totalCycle()).isEqualTo(4),
                () -> Assertions.assertThat(response.timePerCycle()).isEqualTo(30),
                () -> Assertions.assertThat(response.members()).containsExactly(
                        new MemberDto(1L, "member1"),
                        new MemberDto(2L, "member2"))
        );
    }

    @Test
    void 특정_멤버의_현재_사이클의_계획을_조회한다() throws Exception {
        // given & when
        MvcResult result = mockMvc.perform(
                        get("/api/studies/1/content/plans?memberId=1&cycle=1")
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
