package harustudy.backend.view.service;

import static org.assertj.core.api.SoftAssertions.assertSoftly;

import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.view.dto.RequestedPageInfoDto;
import harustudy.backend.view.dto.StudyRecordsPageResponse;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Sql({"/import_dummy_studies.sql"})
@Transactional
@SpringBootTest
class ViewServiceTest {

    @Autowired
    private ViewService viewService;
    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private EntityManager entityManager;

    private Member member;

    @BeforeEach
    void setUp() {
        member = new Member("hiiro", "email", "imageUrl", LoginType.GUEST);
        entityManager.persist(member);

        List<Study> allStudies = studyRepository.findAll();
        for (Study study : allStudies) {
            Participant participant = Participant.instantiateParticipantWithContents(
                    study,
                    member,
                    "nickname"
            );
            entityManager.persist(participant);
        }
    }

    @Test
    void 날짜_범위를_기준으로_스터디_기록을_페이지_조회한다() {
        //given
        Integer page = 0;
        Integer size = 5;
        LocalDate startDate = LocalDate.of(2023, 9, 20);
        LocalDate endDate = LocalDate.of(2023, 10, 10);
        RequestedPageInfoDto requestedPageInfoDto = RequestedPageInfoDto.of(page, size, startDate, endDate);

        Long expectedTotalPages = Math.round((double) studyRepository.count() / (double) size);

        //when
        StudyRecordsPageResponse response = viewService.findStudyRecordsPage(
                member.getId(),
                requestedPageInfoDto
        );

        //then
        assertSoftly(softly -> {
            softly.assertThat(response.studyRecords().size()).isEqualTo(5);
            softly.assertThat(response.pageInfo().pageNum()).isEqualTo(page);
            softly.assertThat(response.pageInfo().totalPages()).isEqualTo(expectedTotalPages.intValue());
        });
    }

    @Test
    void 날짜_범위가_주어지지_않으면_전체_스터디_기록을_페이지_조회한다() {
        //given
        Integer page = 0;
        Integer size = 5;
        RequestedPageInfoDto requestedPageInfoDto = RequestedPageInfoDto.of(page, size, null, null);

        Long expectedTotalPages = Math.round((double) studyRepository.count() / (double) size);

        //when
        StudyRecordsPageResponse response = viewService.findStudyRecordsPage(
                member.getId(),
                requestedPageInfoDto
        );

        //then
        assertSoftly(softly -> {
            softly.assertThat(response.studyRecords().size()).isEqualTo(5);
            softly.assertThat(response.pageInfo().pageNum()).isEqualTo(page);
            softly.assertThat(response.pageInfo().totalPages()).isEqualTo(expectedTotalPages.intValue());
        });
    }
}
