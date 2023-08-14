package harustudy.backend.member.dto;

public record MemberResponseV3(Long memberId, String name, String email, String imageUrl,
                               String loginType) {

}
