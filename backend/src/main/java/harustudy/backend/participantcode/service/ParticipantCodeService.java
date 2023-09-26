package harustudy.backend.participantcode.service;

import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.dto.ParticipantCodeResponse;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.ParticipantCodeNotFoundException;
import harustudy.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ParticipantCodeService {

    private final StudyRepository studyRepository;
    private final ParticipantCodeRepository participantCodeRepository;

    @Transactional(readOnly = true)
    public ParticipantCodeResponse findParticipantCodeByStudyId(Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        ParticipantCode participantCode = participantCodeRepository.findByStudy(study)
                .orElseThrow(ParticipantCodeNotFoundException::new);
        return ParticipantCodeResponse.from(participantCode);
    }
}
