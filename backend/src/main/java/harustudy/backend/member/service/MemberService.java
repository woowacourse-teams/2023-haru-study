package harustudy.backend.member.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.MemberResponse;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberResponse findMember(AuthMember authMember, Long memberId) {
        Member authorizedMember = memberRepository.findById(authMember.id())
                .orElseThrow(MemberNotFoundException::new);
        Member foundMember = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFoundException::new);

        if (authorizedMember.isDifferentMember(foundMember)) {
            throw new AuthorizationException();
        }
        return MemberResponse.from(foundMember);
    }
}
