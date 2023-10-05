package harustudy.backend.admin.service;

import harustudy.backend.admin.dto.AdminContentResponse;
import harustudy.backend.admin.dto.AdminMemberResponse;
import harustudy.backend.admin.dto.AdminMembersResponse;
import harustudy.backend.admin.dto.AdminParticipantCodeResponse;
import harustudy.backend.admin.dto.AdminParticipantResponse;
import harustudy.backend.admin.dto.AdminStudyContentResponse;
import harustudy.backend.admin.dto.AdminStudyResponse;
import harustudy.backend.content.domain.Content;
import harustudy.backend.content.repository.ContentRepository;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class AdminService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;
    private final MemberRepository memberRepository;
    private final ContentRepository contentRepository;
    private final ParticipantCodeRepository participantCodeRepository;

    public List<AdminStudyResponse> findStudies(Pageable pageable) {
        return studyRepository.findAll(pageable)
                .map(AdminStudyResponse::from)
                .toList();
    }

    public List<AdminParticipantResponse> findParticipants(Pageable pageable) {
        return participantRepository.findAll(pageable)
                .map(AdminParticipantResponse::from)
                .toList();
    }

    public AdminMembersResponse findMembers(Pageable pageable, String loginType) {
        Page<Member> memberPages = memberRepository.findAllByLoginTypeIs(pageable, LoginType.from(loginType));

        long totalCount = memberPages.getTotalElements();
        List<AdminMemberResponse> responses = memberPages.map(AdminMemberResponse::from)
                .toList();

        return AdminMembersResponse.of(totalCount, responses);
    }

    public List<AdminContentResponse> findContents(Pageable pageable) {
        return contentRepository.findAll(pageable)
                .map(AdminContentResponse::from)
                .toList();
    }

    public List<AdminParticipantCodeResponse> findParticipantCodes(Pageable pageable) {
        return participantCodeRepository.findAll(pageable)
                .map(AdminParticipantCodeResponse::from)
                .toList();
    }

    public List<AdminStudyResponse> findStudiesCreatedToday(Pageable pageable) {
        LocalDateTime midnightTime = findMidnightTime();

        return studyRepository.findAllByCreatedDateBetween(pageable, midnightTime, LocalDateTime.now())
                .map(AdminStudyResponse::from)
                .toList();
    }

    public List<AdminStudyResponse> findStudiesDoneToday(Pageable pageable) {
        LocalDateTime midnightTime = findMidnightTime();

        return studyRepository.findAllByLastModifiedDateBetweenAndStepIs(pageable, midnightTime,
                        LocalDateTime.now(), Step.DONE)
                .map(AdminStudyResponse::from)
                .toList();
    }

    public AdminStudyContentResponse findContentsOfStudies(Pageable pageable, Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        List<Content> contents = contentRepository.findAllByStudy(pageable, study);

        return AdminStudyContentResponse.of(study, contents);
    }

    private LocalDateTime findMidnightTime() {
        return LocalDateTime.now(ZoneId.of("Asia/Seoul"))
                .withHour(0)
                .withMinute(0)
                .withSecond(0)
                .withNano(0);
    }
}
