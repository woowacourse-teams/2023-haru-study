package harustudy.backend.study.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.exception.ParticipantNotFoundException;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.dto.CreateStudyRequest;
import harustudy.backend.study.dto.StudiesResponse;
import harustudy.backend.study.dto.StudyFilterRequest;
import harustudy.backend.study.dto.StudyResponse;
import harustudy.backend.study.exception.ParticipantCodeNotFoundException;
import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Transactional
@Service
public class StudyService {

    private final MemberRepository memberRepository;
    private final ParticipantRepository participantRepository;
    private final StudyRepository studyRepository;
    private final GenerationStrategy generationStrategy;
    private final ParticipantCodeRepository participantCodeRepository;

    @Transactional(readOnly = true)
    public StudyResponse findStudy(Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        return StudyResponse.from(study);
    }

    @Transactional(readOnly = true)
    public StudiesResponse findStudyWithFilter(StudyFilterRequest request) {
        if (Objects.nonNull(request.participantCode())) {
            return findStudyByParticipantCode(request);
        }
        if (Objects.nonNull(request.memberId())) {
            return findStudyByMemberId(request.memberId());
        }
        return findAllStudies();
    }

    private StudiesResponse findStudyByParticipantCode(StudyFilterRequest request) {
        ParticipantCode participantCode = participantCodeRepository.findByCode(request.participantCode())
                .orElseThrow(ParticipantCodeNotFoundException::new);
        Study study = participantCode.getStudy();
        return StudiesResponse.from(List.of(study));
    }

    private StudiesResponse findStudyByMemberId(Long memberId) {
        List<Study> studies = studyRepository.findByMemberId(memberId);
        return StudiesResponse.from(studies);
    }

    private StudiesResponse findAllStudies() {
        List<Study> studies = studyRepository.findAll();
        return StudiesResponse.from(studies);
    }

    public Long createStudy(CreateStudyRequest request) {
        Study study = new Study(request.name(), request.totalCycle(), request.timePerCycle());
        studyRepository.save(study);
        participantCodeRepository.save(generateUniqueCode(study));

        return study.getId();
    }

    private ParticipantCode generateUniqueCode(Study study) {
        ParticipantCode participantCode = new ParticipantCode(study, generationStrategy);
        while (isParticipantCodePresent(participantCode)) {
            participantCode.regenerate();
        }
        return participantCode;
    }

    private boolean isParticipantCodePresent(ParticipantCode participantCode) {
        return participantCodeRepository.findByCode(participantCode.getCode())
                .isPresent();
    }

    public void proceed(AuthMember authMember, Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        validateIsHost(authMember, study);
        study.proceed();
    }

    private void validateIsHost(AuthMember authMember, Study study) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        Participant participant = participantRepository.findByStudyAndMember(study, member)
                .orElseThrow(ParticipantNotFoundException::new);

        participant.validateIsHost();
    }
}
