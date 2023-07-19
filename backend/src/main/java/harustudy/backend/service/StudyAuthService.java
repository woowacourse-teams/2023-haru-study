package harustudy.backend.service;

import harustudy.backend.dto.response.StudyAuthResponse;
import harustudy.backend.entity.Member;
import harustudy.backend.entity.ParticipantCode;
import harustudy.backend.entity.Study;
import harustudy.backend.repository.MemberRepository;
import harustudy.backend.repository.ParticipantCodeRepository;
import harustudy.backend.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@RequiredArgsConstructor
@Service
public class StudyAuthService {

    private final StudyRepository studyRepository;
    private final ParticipantCodeRepository participantCodeRepository;
    private final MemberRepository memberRepository;

    public StudyAuthResponse checkAuthCode(String code, Long memberId) {
        ParticipantCode participantCode = participantCodeRepository.findByCode(code)
                .orElseThrow(IllegalArgumentException::new);
        Study study = studyRepository.findByParticipantCode(participantCode);

        if (memberId == null) {
            return new StudyAuthResponse(study.getId(), study.getName(), null);
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        if (study.isParticipatedMember(member)) {
            return new StudyAuthResponse(study.getId(), study.getName(), member.getNickname());
        }
        return new StudyAuthResponse(study.getId(), study.getName(), null);
    }
}
