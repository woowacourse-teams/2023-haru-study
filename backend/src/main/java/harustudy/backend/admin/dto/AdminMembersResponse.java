package harustudy.backend.admin.dto;

import harustudy.backend.member.domain.Member;
import java.util.List;
import org.springframework.data.domain.Page;

public record AdminMembersResponse(Integer totalPage, List<AdminMemberResponse> members) {

    public static AdminMembersResponse of(Page<Member> memberPages) {
        List<AdminMemberResponse> data = memberPages.map(AdminMemberResponse::from)
                .toList();

        return new AdminMembersResponse(memberPages.getTotalPages(), data);
    }
}
