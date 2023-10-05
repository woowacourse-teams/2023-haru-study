package harustudy.backend.view.service;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.SoftAssertions.assertSoftly;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import harustudy.backend.testutils.EntityManagerUtil;
import harustudy.backend.view.dto.CalendarStudyRecordsResponse;
import harustudy.backend.view.dto.StudyRecordsPageResponse;
import jakarta.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
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
        setUpWithNativeQuery();
        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    private void setUpWithNativeQuery() {
        LocalDateTime dateTime = LocalDateTime.of(2023, 10, 2, 18,0,0);
        for(int i=0; i<10; i++) {
            Study study1 = new Study("name", 1, 20);
            Study study2 = new Study("name", 1, 20);
            entityManager.persist(study1);
            entityManager.persist(study2);

            entityManager.createQuery("update Study set createdDate = :createdDate where id = :id")
                    .setParameter("createdDate", dateTime)
                    .setParameter("id", study1.getId())
                    .executeUpdate();
            entityManager.createQuery("update Study set createdDate = :createdDate where id = :id")
                    .setParameter("createdDate", dateTime.minusHours(1L))
                    .setParameter("id", study2.getId())
                    .executeUpdate();

            entityManager.persist(Participant.instantiateParticipantWithContents(study1,
                    member, "nickname"));
            entityManager.persist(Participant.instantiateParticipantWithContents(study2,
                    member, "nickname"));

            dateTime = dateTime.minusDays(1L);
        }
    }

    @Test
    void 날짜_범위를_기준으로_스터디_기록을_페이지_조회한다() {
        //given
        AuthMember authMember = new AuthMember(member.getId());
        Integer page = 0;
        Integer size = 5;
        String sortColumn = "createdDate";
        Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.ASC, sortColumn));
        LocalDate startDate = LocalDate.of(2023, 9, 20);
        LocalDate endDate = LocalDate.of(2023, 10, 3);

        Long expectedTotalPages = Math.round((double) studyRepository.count() / (double) size);

        //when
        StudyRecordsPageResponse response = viewService.findStudyRecordsPage(authMember, pageable,
                member.getId(), startDate, endDate);

        List<Study> allStudies = studyRepository.findAll();
        for (Study study : allStudies) {
            System.out.println("study: " + study.getCreatedDate());
        }


        //then
        assertSoftly(softly -> {
            softly.assertThat(response.studyRecords().size()).isEqualTo(size);
            softly.assertThat(response.pageInfo().pageNum()).isEqualTo(page);
            softly.assertThat(response.pageInfo().totalPages()).isEqualTo(expectedTotalPages.intValue());
        });
    }

    @Test
    void 날짜_범위가_주어지지_않으면_전체_스터디_기록을_페이지_조회한다() {
        //given
        AuthMember authMember = new AuthMember(member.getId());
        Integer page = 0;
        Integer size = 5;
        String sortColumn = "createdDate";
        Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.ASC, sortColumn));

        Long expectedTotalPages = Math.round((double) studyRepository.count() / (double) size);

        //when
        StudyRecordsPageResponse response = viewService.findStudyRecordsPage(authMember, pageable,
                member.getId(), null, null);

        //then
        assertSoftly(softly -> {
            softly.assertThat(response.studyRecords().size()).isEqualTo(5);
            softly.assertThat(response.pageInfo().pageNum()).isEqualTo(0);
            softly.assertThat(response.pageInfo().totalPages()).isEqualTo(expectedTotalPages.intValue());
        });
    }

    @Test
    void 다른_멤버의_스터디_기록을_페이지_조회하면_인가_예외가_발생한다() {
        //given
        AuthMember authMember = new AuthMember(member.getId()+1L);
        Integer page = 0;
        Integer size = 5;
        String sortColumn = "createdDate";
        Pageable pageable = PageRequest.of(page, size, Sort.by(Direction.ASC, sortColumn));

        //when, then
        assertThatThrownBy(() -> viewService.findStudyRecordsPage(authMember, pageable,
                member.getId(), null, null)).isInstanceOf(AuthorizationException.class);
    }

    @Test
    void 달력_기반으로_스터디_기록을_조회한다() {
        //given
        AuthMember authMember = new AuthMember(member.getId());
        LocalDate startDate = LocalDate.of(2023, 9, 20);
        LocalDate endDate = LocalDate.of(2023, 10, 10);

        LocalDate expectedTwoRecordsDate1 = LocalDate.of(2023, 9, 23);
        LocalDate expectedTwoRecordsDate2 = LocalDate.of(2023, 10, 2);

        //when
        CalendarStudyRecordsResponse response = viewService.findStudyRecordsForCalendar(authMember,
                member.getId(), startDate, endDate);

        //then
        assertSoftly(sotly -> {
            sotly.assertThat(response.studyRecords().size()).isEqualTo(10);
            sotly.assertThat(response.studyRecords().get(expectedTwoRecordsDate1).size()).isEqualTo(2);
            sotly.assertThat(response.studyRecords().get(expectedTwoRecordsDate2).size()).isEqualTo(2);
        });
    }

    @Test
    void 다른_멤버의_스터디_기록을_달력_기반으로_조회하면_인가_예외가_발생한다() {
        //given
        AuthMember authMember = new AuthMember(member.getId()+1L);

        //when, then
        assertThatThrownBy(() -> viewService.findStudyRecordsForCalendar(authMember, member.getId(),
                null, null)).isInstanceOf(AuthorizationException.class);
    }
}
