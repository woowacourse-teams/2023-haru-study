package harustudy.backend.member.exception;

public class MemberNotParticipatedException extends RuntimeException {

    public static final int CODE = 1000;
    public static final String MESSAGE = "스터디에 참여하지 않은 멤버의 닉네임입니다.";
}
