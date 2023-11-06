package harustudy.backend.view.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.CalendarStudyRecordsResponse;
import harustudy.backend.view.dto.StudyRecordsPageResponse;
import harustudy.backend.view.utils.LocalDateConverter;
import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
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

    public StudyRecordsPageResponse findStudyRecordsPage(AuthMember authMember, Pageable page,
            Long memberId, LocalDate startDate, LocalDate endDate) {
        validateAuthorizedMember(authMember, memberId);
        Page<Study> studyPage = studyRepository.findPageByMemberIdAndCreatedDate(memberId,
                LocalDateConverter.convertStartDate(startDate), LocalDateConverter.convertEndDate(endDate),
                page);

        return StudyRecordsPageResponse.from(studyPage);
    }

    public CalendarStudyRecordsResponse findStudyRecordsForCalendar(AuthMember authMember, Long memberId,
            LocalDate startDate, LocalDate endDate) {
        validateAuthorizedMember(authMember, memberId);
        List<Study> studies = studyRepository.findByMemberIdAndCreatedDateSortedBy(memberId,
                LocalDateConverter.convertStartDate(startDate), LocalDateConverter.convertEndDate(endDate),
                Sort.by(Direction.ASC, "createdDate"));

        return CalendarStudyRecordsResponse.from(studies);
    }

    private void validateAuthorizedMember(AuthMember authMember, Long memberId) {
        if (!Objects.equals(authMember.id(), memberId)) {
            throw new AuthorizationException();
        }
    }
}
