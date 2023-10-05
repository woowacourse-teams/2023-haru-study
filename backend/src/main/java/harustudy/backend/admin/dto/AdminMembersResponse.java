package harustudy.backend.admin.dto;

import java.util.List;

public record AdminMembersResponse(Long totalCount, List<AdminMemberResponse> members) {

    public static AdminMembersResponse of(Long totalCount, List<AdminMemberResponse> members) {
        return new AdminMembersResponse(totalCount, members);
    }
}
