package harustudy.backend.study.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Transactional
@Service
public class ParticipateService {

    private final MemberRepository memberRepository;
    private final StudyRepository studyRepository;

    public Long participate(Long studyId, String nickname) {
        Member member = memberRepository.save(new Member(nickname));
        Study study = studyRepository.findById(studyId)
                .orElseThrow(IllegalArgumentException::new);

        study.participate(member);
        return member.getId();
    }
}
