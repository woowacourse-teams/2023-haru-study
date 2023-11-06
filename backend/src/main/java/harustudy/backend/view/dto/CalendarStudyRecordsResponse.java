package harustudy.backend.view.dto;

import harustudy.backend.study.domain.Study;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public record CalendarStudyRecordsResponse(MultiValueMap<LocalDate, StudyRecordResponse> studyRecords) {

    public static CalendarStudyRecordsResponse from(List<Study> studies) {
        List<StudyRecordResponse> studyRecords = studies.stream()
                .map(StudyRecordResponse::from)
                .toList();

        LinkedMultiValueMap<LocalDate, StudyRecordResponse> clusteredByCreatedDate =
                generateClusterByCreatedDate(studyRecords);

        return new CalendarStudyRecordsResponse(clusteredByCreatedDate);
    }

    private static LinkedMultiValueMap<LocalDate, StudyRecordResponse> generateClusterByCreatedDate(List<StudyRecordResponse> records) {
        LinkedMultiValueMap<LocalDate, StudyRecordResponse> clusteredByCreatedDate = new LinkedMultiValueMap<>();
        for (StudyRecordResponse record : records) {
            clusteredByCreatedDate.add(record.createdDate().toLocalDate(), record);
        }
        return clusteredByCreatedDate;
    }
}
