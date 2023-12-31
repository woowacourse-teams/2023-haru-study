package harustudy.backend.admin.service;

import harustudy.backend.admin.dto.AdminContentsResponse;
import harustudy.backend.admin.dto.AdminMembersResponse;
import harustudy.backend.admin.dto.AdminParticipantCodesResponse;
import harustudy.backend.admin.dto.AdminParticipantsResponse;
import harustudy.backend.admin.dto.AdminStudiesResponse;
import harustudy.backend.admin.dto.AdminStudyContentResponse;
import harustudy.backend.content.domain.Content;
import harustudy.backend.content.repository.ContentRepository;
import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import java.time.LocalDateTime;
import java.time.ZoneId;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class AdminService {

    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;
    private final MemberRepository memberRepository;
    private final ContentRepository contentRepository;
    private final ParticipantCodeRepository participantCodeRepository;

    public AdminStudiesResponse findStudies(Pageable pageable) {
        Page<Study> studyPages = studyRepository.findAll(pageable);
        return AdminStudiesResponse.from(studyPages);
    }

    public AdminParticipantsResponse findParticipants(Pageable pageable) {
        Page<Participant> participantPages = participantRepository.findAll(pageable);
        return AdminParticipantsResponse.from(participantPages);
    }

    public AdminMembersResponse findMembers(Pageable pageable, String loginType) {
        if (loginType == null) {
            Page<Member> memberPages = memberRepository.findAll(pageable);
            return AdminMembersResponse.of(memberPages);
        }
        Page<Member> memberPages = memberRepository.findAllByLoginTypeIs(pageable, LoginType.from(loginType));
        return AdminMembersResponse.of(memberPages);
    }

    public AdminContentsResponse findContents(Pageable pageable) {
        Page<Content> contentPages = contentRepository.findAll(pageable);
        return AdminContentsResponse.from(contentPages);
    }

    public AdminParticipantCodesResponse findParticipantCodes(Pageable pageable) {
        Page<ParticipantCode> participantCodePages = participantCodeRepository.findAll(pageable);
        return AdminParticipantCodesResponse.from(participantCodePages);
    }

    public AdminStudiesResponse findStudiesCreatedToday(Pageable pageable) {
        LocalDateTime midnightTime = findMidnightTime();
        Page<Study> studyPages = studyRepository
                .findAllByCreatedDateBetween(pageable, midnightTime, LocalDateTime.now());

        return AdminStudiesResponse.from(studyPages);
    }

    public AdminStudiesResponse findStudiesDoneToday(Pageable pageable) {
        LocalDateTime midnightTime = findMidnightTime();
        Page<Study> studyPages = studyRepository.findAllByLastModifiedDateBetweenAndStepIs(pageable, midnightTime,
                LocalDateTime.now(), Step.DONE);

        return AdminStudiesResponse.from(studyPages);
    }

    public AdminStudyContentResponse findContentsOfStudies(Pageable pageable, Long studyId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        Page<Content> contents = contentRepository.findAllByStudy(pageable, study);

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
