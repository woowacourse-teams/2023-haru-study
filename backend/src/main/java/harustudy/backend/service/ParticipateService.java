package harustudy.backend.service;

import harustudy.backend.entity.Member;
import harustudy.backend.entity.Study;
import harustudy.backend.repository.MemberRepository;
import harustudy.backend.repository.StudyRepository;
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
