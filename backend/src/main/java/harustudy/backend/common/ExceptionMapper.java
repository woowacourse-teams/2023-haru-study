package harustudy.backend.common;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import harustudy.backend.content.exception.PomodoroContentNotFoundException;
import harustudy.backend.member.exception.MemberNameLengthException;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.exception.MemberNotParticipatedException;
import harustudy.backend.participantcode.exception.ParticipantCodeNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressStatusException;
import harustudy.backend.progress.exception.ProgressNotBelongToRoomException;
import harustudy.backend.room.exception.DuplicatedNicknameException;
import harustudy.backend.room.exception.PomodoroRoomNameLengthException;
import harustudy.backend.room.exception.PomodoroTimePerCycleException;
import harustudy.backend.room.exception.PomodoroTotalCycleException;
import java.util.HashMap;
import java.util.Map;

public class ExceptionMapper {

    private static final Map<Class<? extends Exception>, ExceptionSituation> mapper = new HashMap<>();

    static {
        setupMemberException();
        setupPomodoroContentException();
        setupParticipantCodeException();
        setupPomodoroProgressException();
        setupRoomException();
    }

    private static void setupMemberException() {
        mapper.put(MemberNotFoundException.class,
                ExceptionSituation.of("해당하는 멤버가 없습니다.", NOT_FOUND));
        mapper.put(MemberNameLengthException.class,
                ExceptionSituation.of("멤버의 닉네임 길이가 유효하지 않습니다.", BAD_REQUEST));
        mapper.put(MemberNotParticipatedException.class,
                ExceptionSituation.of("멤버가 해당 스터디에 참여하지 않았습니다.", NOT_FOUND, 1000));
    }

    private static void setupPomodoroContentException() {
        mapper.put(PomodoroContentNotFoundException.class,
                ExceptionSituation.of("해당하는 컨텐츠가 없습니다.", NOT_FOUND));
    }

    private static void setupParticipantCodeException() {
        mapper.put(ParticipantCodeNotFoundException.class,
                ExceptionSituation.of("해당하는 참여코드가 없습니다.", NOT_FOUND));
    }

    private static void setupPomodoroProgressException() {
        mapper.put(PomodoroProgressStatusException.class,
                ExceptionSituation.of("스터디 진행 상태가 적절하지 않습니다.", BAD_REQUEST));
        mapper.put(ProgressNotBelongToRoomException.class,
                ExceptionSituation.of("해당 스터디에 참여한 기록이 없습니다.", FORBIDDEN));
    }

    private static void setupRoomException() {
        mapper.put(DuplicatedNicknameException.class,
                ExceptionSituation.of("멤버 이름은 중복될 수 없습니다.", BAD_REQUEST));
        mapper.put(PomodoroRoomNameLengthException.class,
                ExceptionSituation.of("스터디 이름의 길이가 적절하지 않습니다.", BAD_REQUEST));
        mapper.put(PomodoroTimePerCycleException.class,
                ExceptionSituation.of("시간 당 사이클 횟수가 적절하지 않습니다.", BAD_REQUEST));
        mapper.put(PomodoroTotalCycleException.class,
                ExceptionSituation.of("총 사이클 횟수가 적절하지 않습니다.", BAD_REQUEST));
    }

    public static ExceptionSituation getSituationOf(Exception exception) {
        return mapper.get(exception.getClass());
    }
}
