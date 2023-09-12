package harustudy.backend.member.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.MemberResponse;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberResponse findMemberProfile(AuthMember authMember) {
        Member authorizedMember = memberRepository.findById(authMember.id())
                .orElseThrow(MemberNotFoundException::new);

        return MemberResponse.from(authorizedMember);
    }
}
