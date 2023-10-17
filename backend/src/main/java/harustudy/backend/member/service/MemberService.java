package harustudy.backend.member.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.domain.UnregisterReason;
import harustudy.backend.member.dto.MemberResponse;
import harustudy.backend.member.dto.UnregisterRequest;
import harustudy.backend.member.exception.MemberNotFoundException;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.member.repository.UnregisterReasonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final UnregisterReasonRepository unregisterReasonRepository;

    public MemberResponse findMemberProfile(AuthMember authMember) {
        Member authorizedMember = memberRepository.findById(authMember.id())
                .orElseThrow(MemberNotFoundException::new);

        return MemberResponse.from(authorizedMember);
    }

    @Transactional
    public void unregister(AuthMember authMember, UnregisterRequest request) {
        Member authorizedMember = memberRepository.findById(authMember.id())
                .orElseThrow(MemberNotFoundException::new);
        memberRepository.delete(authorizedMember);

        UnregisterReason unregisterReason = new UnregisterReason(request.reason());
        unregisterReasonRepository.save(unregisterReason);
    }
}
