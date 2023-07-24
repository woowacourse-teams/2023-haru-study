package harustudy.backend.study.dto;

import harustudy.backend.progress.dto.MemberDto;
import java.util.List;

public record StudyMetadataResponse(
        String studyName,
        Integer totalCycle,
        Integer timePerCycle,
        List<MemberDto> members) {

}
