package harustudy.backend.view.dto;

import java.util.List;
import org.springframework.data.domain.Page;

public record StudyRecordsPageResponse(List<StudyRecordResponse> studyRecords, PageInfoResponse pageInfo) {

    public static StudyRecordsPageResponse of(Page<StudyRecordResponse> page) {
        return new StudyRecordsPageResponse(
                page.getContent(),
                new PageInfoResponse(page.getNumber(), page.getTotalPages())
        );
    }
}
