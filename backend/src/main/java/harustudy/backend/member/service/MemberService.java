package harustudy.backend.member.service;

import harustudy.backend.common.EntityNotFoundException.MemberNotFound;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.dto.NicknameResponse;
import harustudy.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public NicknameResponse findNicknameByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(MemberNotFound::new);
        return new NicknameResponse(member.getNickname());
    }
}
