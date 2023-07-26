package harustudy.backend.room.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.CreatePomodoroRoomDto;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.repository.RoomRepository;
import java.util.Optional;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@ExtendWith(MockitoExtension.class)
class CreatePomodoroRoomServiceTest {

    @Mock
    private RoomRepository roomRepository;
    @Mock
    private ParticipantCodeRepository participantCodeRepository;
    @Mock
    private GenerationStrategy generationStrategy;
    @InjectMocks
    private RoomService roomService;

    @Test
    void 스터디_개설시_참여코드가_생성된다() {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("studyName", 1, 20);
        PomodoroRoom pomodoroRoom = new PomodoroRoom("studyName", 1, 20,
                new ParticipantCode(generationStrategy));

        String code = "ABCDEF";

        given(roomRepository.save(any(PomodoroRoom.class))).willReturn(pomodoroRoom);
        given(participantCodeRepository.findByCode(anyString())).willReturn(Optional.empty());
        given(generationStrategy.generate()).willReturn(code);

        // when
        CreatePomodoroRoomDto response = roomService.createRoom(request);

        // then
        assertThat(response.participantCode()).isEqualTo(code);
    }

    @Test
    void 중복된_참여코드로_스터디가_생성되면_참여_코드가_재생성된다() {
        // given
        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("studyName", 1, 20);
        PomodoroRoom pomodoroRoom = new PomodoroRoom("studyName", 1, 20,
                new ParticipantCode(generationStrategy));
        ParticipantCode participantCode = new ParticipantCode(generationStrategy);

        String originalCode = "ABCDEF";
        String regeneratedCode = "BCDEFG";

        given(roomRepository.save(any(PomodoroRoom.class))).willReturn(pomodoroRoom);
        given(participantCodeRepository.findByCode(anyString()))
                .willReturn(Optional.of(participantCode))
                .willReturn(Optional.empty());
        given(generationStrategy.generate())
                .willReturn(originalCode, regeneratedCode);

        // when
        CreatePomodoroRoomDto response = roomService.createRoom(request);

        // then
        assertThat(response.participantCode()).isNotEqualTo(originalCode);
    }
}