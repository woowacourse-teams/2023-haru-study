package harustudy.backend.view.dto;

import java.time.LocalDateTime;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public record CalenderStudyRecordsResponse(MultiValueMap<LocalDateTime, StudyRecordResponse> records) {

    public static CalenderStudyRecordsResponse of() {
        return new CalenderStudyRecordsResponse(new LinkedMultiValueMap<>());
    }
}
