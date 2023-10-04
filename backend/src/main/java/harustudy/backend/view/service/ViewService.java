package harustudy.backend.view.service;

import static harustudy.backend.view.utils.LocalDateConverter.convertEndDate;
import static harustudy.backend.view.utils.LocalDateConverter.convertStartDate;

import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.CalendarStudyRecordsResponse;
import harustudy.backend.view.dto.StudyRecordResponse;
import harustudy.backend.view.dto.StudyRecordsPageResponse;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ViewService {

    private final StudyRepository studyRepository;

    public StudyRecordsPageResponse findStudyRecordsPage(
            Pageable page,
            Long memberId,
            LocalDate startDate,
            LocalDate endDate
    ) {
        Page<Study> studyPage = studyRepository.findPageByMemberIdAndCreatedDate(memberId,
                convertStartDate(startDate), convertEndDate(endDate), page);
        return StudyRecordsPageResponse.from(studyPage.map(StudyRecordResponse::from));
    }

    public CalendarStudyRecordsResponse findStudyRecordsForCalendar(
            Long memberId,
            LocalDate startDate,
            LocalDate endDate
    ) {
        List<Study> studies = studyRepository.findByMemberIdAndCreatedDate(memberId,
                convertStartDate(startDate), convertEndDate(endDate),
                Sort.by(Direction.ASC, "createdDate")
        );

        List<StudyRecordResponse> studyRecords = studies.stream()
                .map(StudyRecordResponse::from)
                .toList();
        return CalendarStudyRecordsResponse.from(studyRecords);
    }
}
