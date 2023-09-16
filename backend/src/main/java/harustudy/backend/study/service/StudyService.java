package harustudy.backend.study.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.InMemoryParticipantCodeRepository;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.dto.CreateStudyRequest;
import harustudy.backend.study.dto.CreateStudyResponse;
import harustudy.backend.study.dto.StudyResponse;
import harustudy.backend.study.dto.StudiesResponse;
import harustudy.backend.study.exception.ParticipantCodeNotFoundException;
import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.study.repository.StudyRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class StudyService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;
    private final MemberRepository memberRepository;
    private final GenerationStrategy generationStrategy;
    private final InMemoryParticipantCodeRepository participantCodeRepository;

    @Transactional(readOnly = true)
    public StudyResponse findStudy(Long studyId) {
        return StudyResponse.from(studyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new));
    }

    @Transactional(readOnly = true)
    public StudiesResponse findStudyWithFilter(Long memberId, String code) {
        if (Objects.nonNull(code)) {
            ParticipantCode participantCode = participantCodeRepository.findByCode(code)
                    .orElseThrow(ParticipantCodeNotFoundException::new);
            Long studyId = participantCode.getStudyId();
            Study study = studyRepository.findByIdIfExists(studyId);
            return StudiesResponse.from(List.of(study));
        }
        if (Objects.nonNull(memberId)) {
            return findStudyByMemberId(memberId);
        }

        return StudiesResponse.from(studyRepository.findAll());
    }

    private StudiesResponse findStudyByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
        List<Participant> participants = participantRepository.findByMember(member);

        List<Study> studies = mapToStudies(participants);

        return StudiesResponse.from(studies);
    }

    private List<Study> mapToStudies(List<Participant> participants) {
        return participants.stream()
                .map(Participant::getStudy)
                .toList();
    }

    public CreateStudyResponse createStudy(CreateStudyRequest request) {
        Study study = new Study(request.name(), request.totalCycle(),
                request.timePerCycle());
        Study savedStudy = studyRepository.save(study);
        ParticipantCode participantCode = generateUniqueCode(study.getId());
        participantCodeRepository.save(participantCode);

        return CreateStudyResponse.from(savedStudy, participantCode);
    }

    private ParticipantCode generateUniqueCode(Long study) {
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
        // TODO: SSE 이벤트 발행
    }

    private void validateIsHost(AuthMember authMember, Study study) {
        // TODO: 방장인지 확인 로직 추가
    }
}
