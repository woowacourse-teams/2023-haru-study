package harustudy.backend.study.service;

import harustudy.backend.auth.dto.AuthMember;
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

    private final StudyRepository studyRepository;
    private final GenerationStrategy generationStrategy;
    private final ParticipantCodeRepository participantCodeRepository;

    @Transactional(readOnly = true)
    public StudyResponse findStudy(Long studyId) {
        return StudyResponse.from(studyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new));
    }

    @Transactional(readOnly = true)
    public StudiesResponse findStudyWithFilter(StudyFilterRequest request) {
        if (Objects.nonNull(request.participantCode())) {
            ParticipantCode participantCode = participantCodeRepository.findByCode(request.participantCode())
                    .orElseThrow(ParticipantCodeNotFoundException::new);
            Study study = participantCode.getStudy();
            return StudiesResponse.from(List.of(study));
        }
        if (Objects.nonNull(request.memberId())) {
            return findStudyByMemberId(request.memberId());
        }

        return StudiesResponse.from(studyRepository.findAll());
    }

    private StudiesResponse findStudyByMemberId(Long memberId) {
        List<Study> studies = studyRepository.findByMemberId(memberId);
        return StudiesResponse.from(studies);
    }

    public Long createStudy(CreateStudyRequest request) {
        Study study = new Study(request.name(), request.totalCycle(),
                request.timePerCycle());
        Study savedStudy = studyRepository.save(study);
        participantCodeRepository.save(generateUniqueCode(savedStudy));

        return savedStudy.getId();
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
        // TODO: 방장인지 확인 로직 추가
    }
}
