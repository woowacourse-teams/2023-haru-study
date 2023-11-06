package harustudy.backend.view.dto;

import harustudy.backend.study.domain.Study;
import java.util.List;
import org.springframework.data.domain.Page;

public record StudyRecordsPageResponse(List<StudyRecordResponse> studyRecords, PageInfoResponse pageInfo) {

    public static StudyRecordsPageResponse from(Page<Study> studyPages) {
        Page<StudyRecordResponse> studyRecordPages = studyPages.map(StudyRecordResponse::from);

        return new StudyRecordsPageResponse(studyRecordPages.getContent(),
                new PageInfoResponse(studyRecordPages.getNumber(), studyRecordPages.getTotalPages()));
    }
}
