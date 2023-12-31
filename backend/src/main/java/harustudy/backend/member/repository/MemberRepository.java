package harustudy.backend.member.repository;

import harustudy.backend.member.domain.LoginType;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.exception.MemberNotFoundException;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    default Member findByIdIfExists(Long id) {
        return findById(id)
                .orElseThrow(MemberNotFoundException::new);
    }

    Page<Member> findAllByLoginTypeIs(Pageable pageable, LoginType loginType);
  
    Optional<Member> findByEmailAndLoginType(String email, LoginType loginType);
}
