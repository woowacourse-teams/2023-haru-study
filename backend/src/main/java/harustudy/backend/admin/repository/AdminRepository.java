package harustudy.backend.admin.repository;

import harustudy.backend.admin.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findByAccountAndPassword(String account, String password);
}
