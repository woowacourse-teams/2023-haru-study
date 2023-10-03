package harustudy.backend.view.dto;

import java.time.LocalDate;
import java.util.List;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public record CalenderStudyRecordsResponse(
        MultiValueMap<LocalDate, StudyRecordResponse> studyRecords
) {

    public static CalenderStudyRecordsResponse of(List<StudyRecordResponse> records) {
        LinkedMultiValueMap<LocalDate, StudyRecordResponse> clusteredByCreatedDate = new LinkedMultiValueMap<>();
        for (StudyRecordResponse record : records) {
            clusteredByCreatedDate.add(
                    record.createdDate().toLocalDate(),
                    record
            );
        }
        return new CalenderStudyRecordsResponse(clusteredByCreatedDate);
    }
}
