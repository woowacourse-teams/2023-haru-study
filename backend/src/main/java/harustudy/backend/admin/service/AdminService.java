package harustudy.backend.admin.service;

import harustudy.backend.admin.dto.AdminLoginRequest;
import harustudy.backend.admin.entity.AdminSession;
import harustudy.backend.admin.exception.AdminNotFoundException;
import harustudy.backend.admin.exception.SessionNotFoundException;
import harustudy.backend.admin.repository.AdminRepository;
import harustudy.backend.admin.repository.AdminSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final AdminSessionRepository adminSessionRepository;

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
}
