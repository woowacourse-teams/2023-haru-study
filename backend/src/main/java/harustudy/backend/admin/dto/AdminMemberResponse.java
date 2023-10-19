package harustudy.backend.admin.dto;

import harustudy.backend.member.domain.Member;

public record AdminMemberResponse(Long id, String name, String email, String imageUrl, String loginType) {

    public static AdminMemberResponse from(Member member) {
        return new AdminMemberResponse(member.getId(), member.getName(), member.getEmail(),
                member.getImageUrl(), member.getLoginType().name());
    }
}
