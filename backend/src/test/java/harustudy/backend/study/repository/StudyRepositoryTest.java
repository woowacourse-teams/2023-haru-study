package harustudy.backend.study.repository;

import harustudy.backend.study.domain.Study;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import javax.sql.DataSource;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class StudyRepositoryTest {

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private EntityManager entityManager;

    @BeforeEach
    void setup() {
        studyRepository.save(new Study("name", 1, 20));
        studyRepository.save(new Study("name2", 1, 20));
        studyRepository.save(new Study("name3", 1, 20));
    }

    @Test
    void pureJpaTest() {
        int offset = 0;
        int size = 2;

        List<Study> resultList = entityManager.createQuery("SELECT s from Study as s")
                .setFirstResult(offset)
                .setMaxResults(size)
                .getResultList();

        for (Study study : resultList) {
            System.out.println(study.getName());
        }
    }

    @Test
    void test() {
        PageRequest pageRequest = PageRequest.of(0, 2, Sort.Direction.ASC, "name");
        Page<Study> page = studyRepository.findAll(pageRequest);


        assertThat(page.getTotalElements()).isEqualTo(3);
        assertThat(page.getTotalPages()).isEqualTo(2);
        assertThat(page.getNumber()).isEqualTo(0);
        assertThat(page.getNumberOfElements()).isEqualTo(2);
        assertThat(page.getSize()).isEqualTo(2);
    }

    @Test
    void tt() {
        PageRequest pageRequest = PageRequest.of(0, 2);
        LocalDateTime before = LocalDateTime.MIN;
        LocalDateTime after = LocalDateTime.now();

        Page<Study> studies = studyRepository.findAllByCreatedDateBetween(pageRequest, before, after);
        List<Study> content = studies.getContent();

        System.out.println(before);
        System.out.println(content);
    }
}
