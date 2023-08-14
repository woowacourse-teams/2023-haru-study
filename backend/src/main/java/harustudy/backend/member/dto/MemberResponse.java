package harustudy.backend.member.dto;

public record MemberResponse(Long memberId, String name, String email, String imageUrl,
                             String loginType) {

}
