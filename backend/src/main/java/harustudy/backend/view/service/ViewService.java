package harustudy.backend.view.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.view.dto.StudyRecordResponse;
import java.time.LocalDate;
import org.springframework.stereotype.Service;

@Service
public class ViewService {

    public StudyRecordResponse findStudyRecordsPage(
            AuthMember authMember,
            Long page,
            Long size,
            LocalDate startDate,
            LocalDate endDate
    ) {
        return null;
    }
}
