package harustudy.backend.integration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.participantcode.dto.FindRoomAndNicknameRequest;
import harustudy.backend.participantcode.dto.FindRoomAndNicknameResponse;
import harustudy.backend.room.dto.ParticipateRequest;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class ParticipateRoomIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void 기존_참여멤버의_참여코드를_인증하고_스터디와_멤버_정보를_반환한다() throws Exception {
        // given
        FindRoomAndNicknameRequest request = new FindRoomAndNicknameRequest(
                participantCode.getCode(), member.getId());
        String jsonRequest = objectMapper.writeValueAsString(request);

        // when
        MvcResult result = mockMvc.perform(
                        post("/api/studies/authenticate")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        FindRoomAndNicknameResponse response = objectMapper.readValue(jsonResponse,
                FindRoomAndNicknameResponse.class);

        assertAll(
                () -> assertThat(response.studyId()).isEqualTo(room.getId()),
                () -> assertThat(response.studyName()).isEqualTo(room.getName()),
                () -> assertThat(response.nickname()).isEqualTo(member.getNickname())
        );
    }

    @Test
    void 신규멤버의_참여코드를_인증하고_스터디_정보를_반환한다() throws Exception {
        // given
        FindRoomAndNicknameRequest request = new FindRoomAndNicknameRequest(
                participantCode.getCode(), null);
        String jsonRequest = objectMapper.writeValueAsString(request);

        // when
        MvcResult result = mockMvc.perform(
                        post("/api/studies/authenticate")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString();
        FindRoomAndNicknameResponse response = objectMapper.readValue(jsonResponse,
                FindRoomAndNicknameResponse.class);

        assertAll(
                () -> assertThat(response.studyId()).isEqualTo(room.getId()),
                () -> assertThat(response.studyName()).isEqualTo(room.getName()),
                () -> assertThat(response.nickname()).isNull()
        );
    }

    @Test
    void 신규멤버_닉네임을_통해_멤버_생성하고_스터디에_참여한다() throws Exception {
        // given
        ParticipateRequest request = new ParticipateRequest("newName");
        String jsonRequest = objectMapper.writeValueAsString(request);

        // when
        MvcResult result = mockMvc.perform(
                        post("/api/studies/{studyId}/members", room.getId())
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andReturn();

        // then
        String locationHeader = result.getResponse().getHeader("Location");
        String expectedLocation = "/api/studies/" + room.getId() + "/members/";

        assertThat(locationHeader).isNotNull();
        assertThat(locationHeader).contains(expectedLocation);
    }
}
