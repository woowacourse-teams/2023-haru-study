package harustudy.backend.study.service;

import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participantcode.domain.GenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.InMemoryParticipantCodeRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.study.domain.PomodoroStudy;
import harustudy.backend.study.dto.CreatePomodoroStudyRequest;
import harustudy.backend.study.dto.CreatePomodoroStudyResponse;
import harustudy.backend.study.dto.PomodoroStudyResponse;
import harustudy.backend.study.dto.PomodoroStudiesResponse;
import harustudy.backend.study.exception.ParticipantCodeNotFoundException;
import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.study.repository.PomodoroStudyRepository;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroStudyService {

    private final PomodoroStudyRepository pomodoroStudyRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final MemberRepository memberRepository;
    private final GenerationStrategy generationStrategy;
    private final InMemoryParticipantCodeRepository participantCodeRepository;

    public PomodoroStudyResponse findPomodoroStudy(Long studyId) {
        return PomodoroStudyResponse.from(pomodoroStudyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new));
    }

    public PomodoroStudiesResponse findPomodoroStudyWithFilter(Long memberId, String code) {
        if (Objects.nonNull(code)) {
            ParticipantCode participantCode = participantCodeRepository.findByCode(code)
                    .orElseThrow(ParticipantCodeNotFoundException::new);
            Long pomodoroStudyId = participantCode.getPomodoroStudyId();
            PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findByIdIfExists(pomodoroStudyId);
            return PomodoroStudiesResponse.from(List.of(pomodoroStudy));
        }
        if (Objects.nonNull(memberId)) {
            return findPomodoroStudyByMemberId(memberId);
        }

        return PomodoroStudiesResponse.from(pomodoroStudyRepository.findAll());
    }

    private PomodoroStudiesResponse findPomodoroStudyByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);
        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findByMember(member);

        List<PomodoroStudy> pomodoroStudies = mapToPomodoroStudies(pomodoroProgresses);

        return PomodoroStudiesResponse.from(pomodoroStudies);
    }

    private List<PomodoroStudy> mapToPomodoroStudies(List<PomodoroProgress> pomodoroProgresses) {
        return pomodoroProgresses.stream()
                .map(PomodoroProgress::getPomodoroStudy)
                .toList();
    }

    public CreatePomodoroStudyResponse createPomodoroStudy(CreatePomodoroStudyRequest request) {
        PomodoroStudy pomodoroStudy = new PomodoroStudy(request.name(), request.totalCycle(),
                request.timePerCycle());
        PomodoroStudy savedStudy = pomodoroStudyRepository.save(pomodoroStudy);
        ParticipantCode participantCode = generateUniqueCode(pomodoroStudy.getId());
        participantCodeRepository.save(participantCode);

        return CreatePomodoroStudyResponse.from(savedStudy, participantCode);
    }

    private ParticipantCode generateUniqueCode(Long pomodoroStudyId) {
        ParticipantCode participantCode = new ParticipantCode(pomodoroStudyId, generationStrategy);
        while (isParticipantCodePresent(participantCode)) {
            participantCode.regenerate();
        }
        return participantCode;
    }

    private boolean isParticipantCodePresent(ParticipantCode participantCode) {
        return participantCodeRepository.findByCode(participantCode.getCode())
                .isPresent();
    }
}
