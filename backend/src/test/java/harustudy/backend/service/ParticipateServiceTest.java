package harustudy.backend.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.Study;
import harustudy.backend.exception.DuplicatedNicknameException;
import harustudy.backend.repository.MemberRepository;
import harustudy.backend.repository.StudyRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@Sql(value = "/data.sql")
@Transactional
class ParticipateServiceTest {

    @Autowired
    private ParticipateService participateService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private EntityManager entityManager;

    @Test
    void 닉네임을_받아_신규_멤버를_생성하고_스터디에_등록한다() {
        // given
        Long existedStudyId = 1L;
        String newMemberNickname = "new_member";

        // when
        Long participatedMemberId = participateService.participate(existedStudyId,
                newMemberNickname);

        entityManager.flush();
        entityManager.clear();

        // then
        Member member = memberRepository.findById(participatedMemberId).get();
        Study study = studyRepository.findById(existedStudyId).get();

        assertThat(study.isParticipatedMember(member)).isTrue();
    }

    @Test
    void 한_스터디_내에서_닉네임이_중복되면_예외를_던진다() {
        // given
        Long existedStudyId = 1L;
        String duplicatedMemberNickname = "member1";

        // when
        assertThatThrownBy(() -> participateService.participate(existedStudyId,
                duplicatedMemberNickname))
                .isInstanceOf(DuplicatedNicknameException.class);
    }
}
