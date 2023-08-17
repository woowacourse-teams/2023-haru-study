package harustudy.backend.member.dto;

import harustudy.backend.member.domain.Member;

public record MemberResponse(Long memberId, String name, String email, String imageUrl,
                             String loginType) {

    public static MemberResponse from(Member member) {
        return new MemberResponse(member.getId(), member.getName(), member.getEmail(),
                member.getImageUrl(), member.getLoginType().name().toLowerCase());
    }
}
