package harustudy.backend.dto.response;

import harustudy.backend.dto.MemberDto;
import java.util.List;

public record StudyMetadataResponse(
        String studyName,
        Integer totalCycle,
        Integer timePerCycle,
        List<MemberDto> members) {

}
