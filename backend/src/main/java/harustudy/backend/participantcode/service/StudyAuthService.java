package harustudy.backend.participantcode.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.dto.StudyAuthResponse;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
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
