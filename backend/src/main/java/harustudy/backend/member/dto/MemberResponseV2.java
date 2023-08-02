package harustudy.backend.member.dto;

import harustudy.backend.member.domain.Member;

public record MemberResponseV2(Long id, String nickname) {

    public static MemberResponseV2 from(Member member) {
        return new MemberResponseV2(member.getId(), member.getNickname());
    }
}
