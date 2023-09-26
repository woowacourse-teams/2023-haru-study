package harustudy.backend.common.exception;

import harustudy.backend.auth.exception.*;
import harustudy.backend.content.exception.ContentNotFoundException;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.participant.exception.NicknameLengthException;
import harustudy.backend.participant.exception.ParticipantNotFoundException;
import harustudy.backend.participant.exception.StudyStepException;
import harustudy.backend.participant.exception.ParticipantNotBelongToStudyException;
import harustudy.backend.study.exception.ParticipantCodeExpiredException;
import harustudy.backend.study.exception.ParticipantCodeNotFoundException;
import harustudy.backend.study.exception.StudyNameLengthException;
import harustudy.backend.study.exception.TimePerCycleException;
import harustudy.backend.study.exception.TotalCycleException;
import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.view.exception.CurrentCycleContentNotExistsException;
import harustudy.backend.view.exception.SubmitNotAllowedStepException;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;

import static org.springframework.http.HttpStatus.*;

public class ExceptionMapper {

    private static final Map<Class<? extends Exception>, ExceptionSituation> mapper = new LinkedHashMap<>();

    static {
        setUpMemberException();
        setUpContentException();
        setUpParticipantException();
        setUpStudyException();
        setUpAuthenticationException();
        setUpAuthorizationException();
    }

    private static void setUpMemberException() {
        mapper.put(MemberNotFoundException.class,
                ExceptionSituation.of("해당하는 멤버가 없습니다.", NOT_FOUND, 1002));
    }

    private static void setUpContentException() {
        mapper.put(ContentNotFoundException.class,
                ExceptionSituation.of("해당하는 컨텐츠가 없습니다.", NOT_FOUND, 1100));
    }

    private static void setUpParticipantException() {
        mapper.put(ParticipantNotFoundException.class,
                ExceptionSituation.of("해당 스터디에 참여한 상태가 아닙니다.", NOT_FOUND, 1201));
        mapper.put(StudyStepException.class,
                ExceptionSituation.of("스터디 진행 상태가 적절하지 않습니다.", BAD_REQUEST, 1202));
        mapper.put(ParticipantNotBelongToStudyException.class,
                ExceptionSituation.of("해당 스터디에 참여한 기록이 없습니다.", BAD_REQUEST, 1203));
        mapper.put(NicknameLengthException.class,
                ExceptionSituation.of("닉네임 길이가 유효하지 않습니다.", BAD_REQUEST, 1204));
    }

    private static void setUpStudyException() {
        mapper.put(ParticipantCodeNotFoundException.class,
                ExceptionSituation.of("참여 코드가 만료되었거나 존재하지 않습니다.", NOT_FOUND, 1300));
        mapper.put(ParticipantCodeExpiredException.class,
                ExceptionSituation.of("만료된 참여코드입니다.", BAD_REQUEST, 1301));
        mapper.put(StudyNotFoundException.class,
                ExceptionSituation.of("해당하는 스터디가 없습니다.", NOT_FOUND, 1302));
        mapper.put(StudyNameLengthException.class,
                ExceptionSituation.of("스터디 이름의 길이가 적절하지 않습니다.", BAD_REQUEST, 1304));
        mapper.put(TimePerCycleException.class,
                ExceptionSituation.of("시간 당 사이클 횟수가 적절하지 않습니다.", BAD_REQUEST, 1305));
        mapper.put(TotalCycleException.class,
                ExceptionSituation.of("총 사이클 횟수가 적절하지 않습니다.", BAD_REQUEST, 1306));
        mapper.put(SubmitNotAllowedStepException.class,
                ExceptionSituation.of("해당 단계에서는 제출 여부를 조회할 수 없습니다.", BAD_REQUEST, 1308));
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
        mapper.put(RefreshTokenNotExistsException.class,
                ExceptionSituation.of("갱신 토큰이 존재하지 않습니다.", BAD_REQUEST, 1405));
    }

    private static void setUpAuthorizationException() {
        mapper.put(AuthorizationException.class,
                ExceptionSituation.of("권한이 없습니다.", FORBIDDEN, 1500));
    }

    public static ExceptionSituation getSituationOf(Exception exception) {
        return mapper.get(exception.getClass());
    }

    public static List<ExceptionSituation> getExceptionSituations() {
        return mapper.values()
                .stream()
                .toList();
    }
}
