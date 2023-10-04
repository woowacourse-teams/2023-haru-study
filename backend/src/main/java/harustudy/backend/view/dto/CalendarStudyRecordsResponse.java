package harustudy.backend.view.dto;

import java.time.LocalDate;
import java.util.List;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public record CalendarStudyRecordsResponse(
        MultiValueMap<LocalDate, StudyRecordResponse> studyRecords
) {

    public static CalendarStudyRecordsResponse of(List<StudyRecordResponse> records) {
        LinkedMultiValueMap<LocalDate, StudyRecordResponse> clusteredByCreatedDate = new LinkedMultiValueMap<>();
        for (StudyRecordResponse record : records) {
            clusteredByCreatedDate.add(
                    record.createdDate().toLocalDate(),
                    record
            );
        }
        return new CalendarStudyRecordsResponse(clusteredByCreatedDate);
    }
}
