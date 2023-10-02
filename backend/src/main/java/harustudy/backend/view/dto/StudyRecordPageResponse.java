package harustudy.backend.view.dto;

import java.util.List;

public record StudyRecordPageResponse(List<StudyRecordResponse> studyRecords, PageInfoResponse pageInfo) {

}
