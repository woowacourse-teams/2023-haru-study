package harustudy.backend.room.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.participantcode.service.ParticipantCodeService;
import harustudy.backend.room.service.ProgressService;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.service.PomodoroRoomService;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@MockBean(JpaMetamodelMappingContext.class)
@WebMvcTest(RoomController.class)
class ParticipantCodeControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private PomodoroRoomService pomodoroRoomService;
    @MockBean
    private ProgressService progressService;
    @MockBean
    private ParticipantCodeService participantCodeService;
    @Autowired
    private ObjectMapper objectMapper;

    @ParameterizedTest
    @ValueSource(strings = {"", "12345678910"})
    void 이름이_잘못된_경우_예외를_반환한다(String name) throws Exception {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest(name, 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(pomodoroRoomService.createRoom(any(CreatePomodoroRoomRequest.class)))
                .willReturn(new CreatePomodoroRoomDto(1L, "123456"));
        // when, then
        mockMvc.perform(
                        post("/api/studies")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 9})
    void 사이클_수가_잘못된_경우_예외를_반환한다(int totalCycle) throws Exception {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("123", totalCycle, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(pomodoroRoomService.createRoom(any(CreatePomodoroRoomRequest.class)))
                .willReturn(new CreatePomodoroRoomDto(1L, "123456"));
        // when, then
        mockMvc.perform(
                        post("/api/studies")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @ParameterizedTest
    @ValueSource(ints = {19, 41})
    void 사이클_당_시간이_잘못된_경우_예외를_반환한다(int timePerCycle) throws Exception {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("123", 1,
                timePerCycle);
        String jsonRequest = objectMapper.writeValueAsString(request);

        given(pomodoroRoomService.createRoom(any(CreatePomodoroRoomRequest.class)))
                .willReturn(new CreatePomodoroRoomDto(1L, "123456"));
        // when, then
        mockMvc.perform(
                        post("/api/studies")
                                .content(jsonRequest)
                                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
