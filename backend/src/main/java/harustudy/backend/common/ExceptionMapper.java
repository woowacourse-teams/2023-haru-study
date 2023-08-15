package harustudy.backend.common;

import static org.springframework.http.HttpStatus.*;

import harustudy.backend.auth.exception.InvalidProviderNameException;
import harustudy.backend.auth.exception.InvalidRefreshTokenException;
import harustudy.backend.auth.exception.RefreshTokenExpiredException;
import harustudy.backend.content.exception.PomodoroContentNotFoundException;
import harustudy.backend.member.exception.MemberNameLengthException;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.exception.MemberNotParticipatedException;
import harustudy.backend.room.exception.ParticipantCodeExpiredException;
import harustudy.backend.room.exception.ParticipantCodeNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressStatusException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.room.exception.DuplicatedNicknameException;
import harustudy.backend.room.exception.PomodoroRoomNameLengthException;
import harustudy.backend.room.exception.PomodoroTimePerCycleException;
import harustudy.backend.room.exception.PomodoroTotalCycleException;
import harustudy.backend.room.exception.RoomNotFoundException;
import java.util.HashMap;
import java.util.Map;

public class ExceptionMapper {

    private static final Map<Class<? extends Exception>, ExceptionSituation> mapper = new HashMap<>();

    static {
        setupMemberException();
        setupPomodoroContentException();
        setupPomodoroProgressException();
        setupRoomException();
        setupAuthException();
    }

    private static void setupMemberException() {
        mapper.put(MemberNotParticipatedException.class,
                ExceptionSituation.of("멤버가 해당 스터디에 참여하지 않았습니다.", NOT_FOUND, 1000));
        mapper.put(MemberNameLengthException.class,
                ExceptionSituation.of("멤버의 닉네임 길이가 유효하지 않습니다.", BAD_REQUEST, 1001));
        mapper.put(MemberNotFoundException.class,
                ExceptionSituation.of("해당하는 멤버가 없습니다.", NOT_FOUND, 1002));
    }

    private static void setupPomodoroContentException() {
        mapper.put(PomodoroContentNotFoundException.class,
                ExceptionSituation.of("해당하는 컨텐츠가 없습니다.", NOT_FOUND, 1100));
    }

    private static void setupPomodoroProgressException() {
        mapper.put(PomodoroProgressNotFoundException.class,
                ExceptionSituation.of("해당 스터디에 참여한 상태가 아닙니다.", NOT_FOUND, 1201));
        mapper.put(PomodoroProgressStatusException.class,
                ExceptionSituation.of("스터디 진행 상태가 적절하지 않습니다.", BAD_REQUEST, 1202));
        mapper.put(ProgressNotBelongToRoomException.class,
                ExceptionSituation.of("해당 스터디에 참여한 기록이 없습니다.", BAD_REQUEST, 1203));
    }

    private static void setupRoomException() {
        mapper.put(ParticipantCodeNotFoundException.class,
                ExceptionSituation.of("해당하는 참여코드가 없습니다.", NOT_FOUND, 1300));
        mapper.put(ParticipantCodeExpiredException.class,
                ExceptionSituation.of("만료된 참여코드입니다.", BAD_REQUEST, 1301));
        mapper.put(RoomNotFoundException.class,
                ExceptionSituation.of("해당하는 스터디가 없습니다.", NOT_FOUND, 1302));
        mapper.put(DuplicatedNicknameException.class,
                ExceptionSituation.of("멤버 이름은 중복될 수 없습니다.", BAD_REQUEST, 1303));
        mapper.put(PomodoroRoomNameLengthException.class,
                ExceptionSituation.of("스터디 이름의 길이가 적절하지 않습니다.", BAD_REQUEST, 1304));
        mapper.put(PomodoroTimePerCycleException.class,
                ExceptionSituation.of("시간 당 사이클 횟수가 적절하지 않습니다.", BAD_REQUEST, 1305));
        mapper.put(PomodoroTotalCycleException.class,
                ExceptionSituation.of("총 사이클 횟수가 적절하지 않습니다.", BAD_REQUEST, 1306));
    }

    private static void setupAuthException() {
        mapper.put(InvalidProviderNameException.class,
                ExceptionSituation.of("유효하지 않은 프로바이더 이름입니다.", BAD_REQUEST, 1400));
        mapper.put(InvalidRefreshTokenException.class,
                ExceptionSituation.of("유효하지 않은 갱신 토큰입니다.", BAD_REQUEST, 1401));
        mapper.put(RefreshTokenExpiredException.class,
                ExceptionSituation.of("만료된 갱신 토큰입니다.", UNAUTHORIZED, 1402));
    }

    public static ExceptionSituation getSituationOf(Exception exception) {
        return mapper.get(exception.getClass());
    }
}
