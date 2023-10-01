package harustudy.backend.admin.service;

import harustudy.backend.admin.dto.AdminContentResponse;
import harustudy.backend.admin.dto.AdminMemberResponse;
import harustudy.backend.admin.dto.AdminParticipantResponse;
import harustudy.backend.admin.dto.AdminStudyResponse;
import harustudy.backend.content.domain.Content;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.study.domain.Study;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class AdminServiceTest {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private AdminService adminService;

    @BeforeEach
    void setUp() {
        int DUMMY_SIZE = 15;

        for (int i = 0; i < DUMMY_SIZE; i++) {
            Member member = new Member("name", "email", "imageUrl", LoginType.GUEST);
            Study study = new Study("name", 1, 20);
            Participant participant = Participant.instantiateParticipantWithContents(study, member, "nickname");
            Content content = new Content(participant, 1);

            entityManager.persist(member);
            entityManager.persist(study);
            entityManager.persist(participant);
            entityManager.persist(content);
        }
    }

    @Test
    void 멤버를_페이징_기반으로_조회할_수_있다() {
        // given
        PageRequest pageRequest = PageRequest.of(1, 5);

        // when
        List<AdminMemberResponse> members = adminService.findMembers(pageRequest);

        // then
        assertThat(members).hasSize(5);
    }

    @Test
    void 스터디를_페이징_기반으로_조회할_수_있다() {
        // given
        PageRequest pageRequest = PageRequest.of(1, 5);

        // when
        List<AdminStudyResponse> studies = adminService.findStudies(pageRequest);

        // then
        assertThat(studies).hasSize(5);
    }

    @Test
    void 참여자_정보를_페이징_기반으로_조회할_수_있다() {
        // given
        PageRequest pageRequest = PageRequest.of(1, 5);

        // when
        List<AdminParticipantResponse> participants = adminService.findParticipants(pageRequest);

        // then
        assertThat(participants).hasSize(5);
    }

    @Test
    void 컨텐츠를_페이징_기반으로_조회할_수_있다() {
        // given
        PageRequest pageRequest = PageRequest.of(1, 5);

        // when
        List<AdminContentResponse> contents = adminService.findContents(pageRequest);

        // then
        assertThat(contents).hasSize(5);
    }

    @Test
    void 오늘_개설된_스터디를_조회할_수_있다() {
        // given
        PageRequest pageRequest = PageRequest.of(0, 20);

        Study study = new Study("name", 1, 20);
        Study studyCreatedYesterday = new Study("name", 1, 20);

        entityManager.persist(study);
        entityManager.persist(studyCreatedYesterday);
        entityManager.flush();

        entityManager.createQuery("update Study set createdDate = :createdDate where id = :id")
                .setParameter("createdDate", LocalDateTime.now().minus(1L, ChronoUnit.DAYS))
                .setParameter("id", studyCreatedYesterday.getId())
                .executeUpdate();

        // when
        List<AdminStudyResponse> studies = adminService.findStudiesCreatedToday(pageRequest);

        // then
        assertThat(studies).hasSize(16);
    }

    @Test
    void 오늘_완료된_스터디를_조회할_수_있다() {
        // given
        PageRequest pageRequest = PageRequest.of(0, 5);

        Study study = new Study("name", 1, 20);
        Study studyDoneYesterday = new Study("name", 1, 20);

        int stepLength = Step.values().length;
        for (int i = 0; i < stepLength - 1; i++) {
            study.proceed();
            studyDoneYesterday.proceed();
        }

        entityManager.persist(study);
        entityManager.persist(studyDoneYesterday);
        entityManager.flush();

        entityManager.createQuery("update Study set lastModifiedDate = :lastModifiedDate where id = :id")
                .setParameter("lastModifiedDate", LocalDateTime.now().minus(1L, ChronoUnit.DAYS))
                .setParameter("id", studyDoneYesterday.getId())
                .executeUpdate();

        // when
        List<AdminStudyResponse> studies = adminService.findStudiesDoneToday(pageRequest);

        // then
        assertThat(studies)
                .hasSize(1)
                .allMatch(each -> each.step().equals(Step.DONE.name()));
    }
}
