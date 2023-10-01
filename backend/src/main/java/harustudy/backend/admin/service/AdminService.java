package harustudy.backend.admin.service;

import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.dto.AdminParticipantResponse;
import harustudy.backend.admin.dto.AdminStudyResponse;
import harustudy.backend.admin.entity.AdminSession;
import harustudy.backend.admin.exception.AdminNotFoundException;
import harustudy.backend.admin.exception.SessionNotFoundException;
import harustudy.backend.admin.repository.AdminRepository;
import harustudy.backend.admin.repository.AdminSessionRepository;
import harustudy.backend.participant.repository.ParticipantRepository;
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

    public UUID login(AdminLoginRequest request) {
        String account = request.account();
        String password = request.password();

        adminRepository.findByAccountAndPassword(account, password)
                .orElseThrow(AdminNotFoundException::new);

        return createSession();
    }

    private UUID createSession() {
        UUID uuid = UUID.randomUUID();
        AdminSession adminSession = new AdminSession(uuid);
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
}
