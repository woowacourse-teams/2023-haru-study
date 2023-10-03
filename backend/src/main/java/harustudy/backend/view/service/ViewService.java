package harustudy.backend.view.service;

import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.RequestedPageInfoDto;
import harustudy.backend.view.dto.StudyRecordResponse;
import harustudy.backend.view.dto.StudyRecordsPageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
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
            Long memberId,
            RequestedPageInfoDto requestedPageInfoDto
    ) {
        PageRequest pageRequest = PageRequest.of(
                requestedPageInfoDto.page(),
                requestedPageInfoDto.size(),
                Sort.by(Direction.ASC, "createdDate")
        );
        Page<Study> page = studyRepository.findStudyPageByMemberIdAndCreatedDate(
                memberId,
                requestedPageInfoDto.startDate(),
                requestedPageInfoDto.endDate(),
                pageRequest);

        return StudyRecordsPageResponse.of(page.map(StudyRecordResponse::of));
    }
}
