package harustudy.backend.admin.service;

import harustudy.backend.admin.dto.AdminContentResponse;
import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.dto.AdminMemberResponse;
import harustudy.backend.admin.dto.AdminParticipantCodeResponse;
import harustudy.backend.admin.dto.AdminParticipantResponse;
import harustudy.backend.admin.dto.AdminStudyResponse;
import harustudy.backend.admin.entity.AdminSession;
import harustudy.backend.admin.exception.AdminNotFoundException;
import harustudy.backend.admin.exception.SessionNotFoundException;
import harustudy.backend.admin.repository.AdminRepository;
import harustudy.backend.admin.repository.AdminSessionRepository;
import harustudy.backend.content.repository.ContentRepository;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.participantcode.repository.ParticipantCodeRepository;
import harustudy.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final AdminSessionRepository adminSessionRepository;
    private final StudyRepository studyRepository;
    private final ParticipantRepository participantRepository;
    private final MemberRepository memberRepository;
    private final ContentRepository contentRepository;
    private final ParticipantCodeRepository participantCodeRepository;

    public UUID login(AdminLoginRequest request) {
        String account = request.account();
        String password = request.password();

        adminRepository.findByAccountAndPassword(account, password)
                .orElseThrow(AdminNotFoundException::new);

        return createSession();
    }

    private UUID createSession() {
        AdminSession adminSession = new AdminSession();
        AdminSession saved = adminSessionRepository.save(adminSession);

        return saved.getUuid();
    }

    public void validateSession(UUID uuid) {
        AdminSession adminSession = adminSessionRepository.findByUuid(uuid)
                .orElseThrow(SessionNotFoundException::new);

        adminSession.validateIsExpired();
    }

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

    public List<AdminMemberResponse> findMembers(Pageable pageable) {
        return memberRepository.findAll(pageable)
                .map(AdminMemberResponse::from)
                .toList();
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
}
