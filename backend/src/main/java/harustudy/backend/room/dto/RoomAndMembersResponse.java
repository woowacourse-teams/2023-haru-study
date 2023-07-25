package harustudy.backend.room.dto;

import java.util.List;

public record RoomAndMembersResponse(String studyName, Integer totalCycle, Integer timePerCycle,
                                     List<MemberDto> members) {

}
