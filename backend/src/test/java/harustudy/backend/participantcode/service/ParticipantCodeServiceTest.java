package harustudy.backend.participantcode.service;

import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.dto.ParticipantCodeResponse;
import harustudy.backend.study.domain.Study;
import jakarta.persistence.EntityManager;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@Transactional
@SpringBootTest
class ParticipantCodeServiceTest {

    @Autowired
    private ParticipantCodeService participantCodeService;

    @Autowired
    private EntityManager entityManager;

    @Test
    void 스터디_아이디로_참여_코드를_조회한다() {
        // given
        Study study = new Study("study", 1, 20);
        ParticipantCode participantCode = new ParticipantCode(study, new CodeGenerationStrategy());
        entityManager.persist(study);
        entityManager.persist(participantCode);
        entityManager.flush();
        entityManager.clear();

        // when
        ParticipantCodeResponse result = participantCodeService.findParticipantCodeByStudyId(
                study.getId());

        // then
        Assertions.assertThat(result.participantCode()).hasSize(6);
    }
}
