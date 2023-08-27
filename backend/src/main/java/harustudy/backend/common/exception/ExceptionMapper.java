package harustudy.backend.common.exception;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.auth.exception.InvalidAccessTokenException;
import harustudy.backend.auth.exception.InvalidAuthorizationHeaderException;
import harustudy.backend.auth.exception.InvalidProviderNameException;
import harustudy.backend.auth.exception.InvalidRefreshTokenException;
import harustudy.backend.auth.exception.RefreshTokenExpiredException;
import harustudy.backend.content.exception.PomodoroContentNotFoundException;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.progress.exception.NicknameLengthException;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressStatusException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.room.exception.ParticipantCodeExpiredException;
import harustudy.backend.room.exception.ParticipantCodeNotFoundException;
import harustudy.backend.room.exception.PomodoroRoomNameLengthException;
import harustudy.backend.room.exception.PomodoroTimePerCycleException;
import harustudy.backend.room.exception.PomodoroTotalCycleException;
import harustudy.backend.room.exception.RoomNotFoundException;
import java.util.HashMap;
import java.util.Map;

public class ExceptionMapper {

    private static final Map<Class<? extends Exception>, ExceptionSituation> mapper = new HashMap<>();

    static {
        setUpMemberException();
        setUpPomodoroContentException();
        setUpPomodoroProgressException();
        setUpRoomException();
        setUpAuthenticationException();
        setUpAuthorizationException();
    }

    private static void setUpMemberException() {
        mapper.put(MemberNotFoundException.class,
                ExceptionSituation.of("해당하는 멤버가 없습니다.", NOT_FOUND, 1002));
    }

    private static void setUpPomodoroContentException() {
        mapper.put(PomodoroContentNotFoundException.class,
                ExceptionSituation.of("해당하는 컨텐츠가 없습니다.", NOT_FOUND, 1100));
    }

    private static void setUpPomodoroProgressException() {
        mapper.put(PomodoroProgressNotFoundException.class,
                ExceptionSituation.of("해당 스터디에 참여한 상태가 아닙니다.", NOT_FOUND, 1201));
        mapper.put(PomodoroProgressStatusException.class,
                ExceptionSituation.of("스터디 진행 상태가 적절하지 않습니다.", BAD_REQUEST, 1202));
        mapper.put(ProgressNotBelongToRoomException.class,
                ExceptionSituation.of("해당 스터디에 참여한 기록이 없습니다.", BAD_REQUEST, 1203));
        mapper.put(NicknameLengthException.class,
                ExceptionSituation.of("닉네임 길이가 유효하지 않습니다.", BAD_REQUEST, 1204));
    }

    private static void setUpRoomException() {
        mapper.put(ParticipantCodeNotFoundException.class,
                ExceptionSituation.of("해당하는 참여코드가 없습니다.", NOT_FOUND, 1300));
        mapper.put(ParticipantCodeExpiredException.class,
                ExceptionSituation.of("만료된 참여코드입니다.", BAD_REQUEST, 1301));
        mapper.put(RoomNotFoundException.class,
                ExceptionSituation.of("해당하는 스터디가 없습니다.", NOT_FOUND, 1302));
        mapper.put(PomodoroRoomNameLengthException.class,
                ExceptionSituation.of("스터디 이름의 길이가 적절하지 않습니다.", BAD_REQUEST, 1304));
        mapper.put(PomodoroTimePerCycleException.class,
                ExceptionSituation.of("시간 당 사이클 횟수가 적절하지 않습니다.", BAD_REQUEST, 1305));
        mapper.put(PomodoroTotalCycleException.class,
                ExceptionSituation.of("총 사이클 횟수가 적절하지 않습니다.", BAD_REQUEST, 1306));
    }

    private static void setUpAuthenticationException() {
        mapper.put(InvalidProviderNameException.class,
                ExceptionSituation.of("유효하지 않은 프로바이더 이름입니다.", BAD_REQUEST, 1400));
        mapper.put(InvalidRefreshTokenException.class,
                ExceptionSituation.of("유효하지 않은 갱신 토큰입니다.", BAD_REQUEST, 1401));
        mapper.put(RefreshTokenExpiredException.class,
                ExceptionSituation.of("만료된 갱신 토큰입니다.", BAD_REQUEST, 1402));
        mapper.put(InvalidAccessTokenException.class,
                ExceptionSituation.of("유효하지 않은 액세스 토큰입니다", UNAUTHORIZED, 1403));
        mapper.put(InvalidAuthorizationHeaderException.class,
                ExceptionSituation.of("유효하지 않은 인증 헤더 형식입니다.", BAD_REQUEST, 1404));
    }

    private static void setUpAuthorizationException() {
        mapper.put(AuthorizationException.class,
                ExceptionSituation.of("권한이 없습니다.", FORBIDDEN, 1500));
    }

    public static ExceptionSituation getSituationOf(Exception exception) {
        return mapper.get(exception.getClass());
    }
}
