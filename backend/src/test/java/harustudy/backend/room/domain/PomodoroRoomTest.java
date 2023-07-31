package harustudy.backend.room.domain;

import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.exception.PomodoroTimePerCycleException;
import harustudy.backend.room.exception.PomodoroTotalCycleException;
import harustudy.backend.room.exception.RoomNameLengthException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroRoomTest {

    private ParticipantCode participantCode;

    @BeforeEach
    void setUp() {
        participantCode = new ParticipantCode(new CodeGenerationStrategy());
    }

    @Test
    void 스터디방은_스터디명_사이클_수_사이클_당_스터디_시간이_필요하다() {
        // given, when, then
        assertThatCode(() -> new PomodoroRoom("teo", 3, 20, participantCode))
                .doesNotThrowAnyException();
    }

    @Test
    void 스터디방_이름이_1자_이상_10자_이하이면_정상_케이스이다() {
        // given
        String name = "12345";

        // when, then
        assertThatCode(() -> new PomodoroRoom(name, 3, 20, participantCode))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(strings = {"", "01234567890"})
    void 스터디방_이름이_1자_미만이거나_10자_초과라면_예외를_던진다(String name) {
        // given, when, then
        assertThatThrownBy(() -> new PomodoroRoom(name, 3, 20, participantCode))
                .isInstanceOf(RoomNameLengthException.class);
    }

    @ParameterizedTest
    @ValueSource(ints = {1, 8})
    void 사이클은_최소_1번_최대_8번이_정상_케이스이다(int cycle) {
        // given, when, then
        assertThatCode(() -> new PomodoroRoom("teo", cycle, 20, participantCode))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(ints = {0, 9})
    void 사이클은_1번_미만이거나_8번_초과라면_예외를_던진다(int cycle) {
        // given, when, then
        assertThatThrownBy(() -> new PomodoroRoom("teo", cycle, 20, participantCode))
                .isInstanceOf(PomodoroTotalCycleException.class);
    }

    @ParameterizedTest
    @ValueSource(ints = {20, 60})
    void 스터디_시간은_최소_20분_최대_60분이_정상_케이스이다(int timePerCycle) {
        // given, when, then
        assertThatCode(() -> new PomodoroRoom("teo", 5, timePerCycle, participantCode))
                .doesNotThrowAnyException();
    }

    @ParameterizedTest
    @ValueSource(ints = {19, 61})
    void 스터디_시간은_20분_미만이거나_60분_초과라면_예외를_던진다(int timePerCycle) {
        // given, when, then
        assertThatThrownBy(() -> new PomodoroRoom("teo", 5, timePerCycle, participantCode))
                .isInstanceOf(PomodoroTimePerCycleException.class);
    }
}
