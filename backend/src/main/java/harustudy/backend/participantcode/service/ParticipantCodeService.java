package harustudy.backend.participantcode.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.dto.StudyAuthResponse;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.room.domain.Study;
import harustudy.backend.room.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: @Transactional(readonly = true)
@RequiredArgsConstructor
@Transactional
@Service
public class ParticipantCodeService {

    private final StudyRepository studyRepository;
    private final ParticipantCodeRepository participantCodeRepository;
    private final MemberRepository memberRepository;

    public StudyAuthResponse findRoomByCodeWithMemberId(String code, Long memberId) {
        ParticipantCode participantCode = participantCodeRepository.findByCode(code)
                .orElseThrow(IllegalArgumentException::new);
        Study study = studyRepository.findByParticipantCode(participantCode);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(IllegalArgumentException::new);

        if (!study.isParticipatedMember(member)) {
            throw new IllegalArgumentException();
        }
        return new StudyAuthResponse(study.getId(), study.getName(), member.getNickname());
    }

    public StudyAuthResponse findRoomByCode(String code) {
        ParticipantCode participantCode = participantCodeRepository.findByCode(code)
                .orElseThrow(IllegalArgumentException::new);
        Study study = studyRepository.findByParticipantCode(participantCode);
        return new StudyAuthResponse(study.getId(), study.getName());
    }
}
