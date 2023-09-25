package harustudy.backend.participant.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.dto.ParticipateStudyRequest;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.participant.dto.ParticipantsResponse;
import harustudy.backend.participant.exception.ParticipantNotFoundException;
import harustudy.backend.participant.exception.ParticipantNotBelongToStudyException;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import jakarta.annotation.Nullable;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class ParticipantService {

    private final MemberRepository memberRepository;
    private final ParticipantRepository participantRepository;
    private final StudyRepository studyRepository;

    @Transactional(readOnly = true)
    public ParticipantResponse findParticipant(
            AuthMember authMember, Long studyId, Long participantId
    ) {
        Study study = studyRepository.findByIdIfExists(studyId);
        Participant participant = participantRepository.findByIdIfExists(participantId);
        validateParticipantIsRelatedWith(participant, authMember, study);
        return ParticipantResponse.from(participant);
    }

    // TODO: 임시용이므로 이후에 제거
    public ParticipantsResponse tempFindParticipantWithFilter(
            AuthMember authMember, Long studyId, Long memberId
    ) {
        Study study = studyRepository.findByIdIfExists(studyId);
        if (Objects.isNull(memberId)) {
            validateEverParticipated(authMember, study);
            return getParticipantsResponseWithoutMemberFilter(study);
        }
        Member member = memberRepository.findByIdIfExists(memberId);
        validateIsSameMemberId(authMember, memberId);
        return tempGetParticipantsResponseWithMemberFilter(study, member);
    }

    // TODO: 임시용이므로 이후에 제거
    private ParticipantsResponse tempGetParticipantsResponseWithMemberFilter(
            Study study, Member member) {
        return participantRepository.findByStudyAndMember(study, member)
                .map(ParticipantResponse::from)
                .map(response -> ParticipantsResponse.from(List.of(response)))
                .orElseGet(() -> ParticipantsResponse.from(null));
    }

    // TODO: 동적쿼리로 변경(memberId 유무에 따른 분기처리)
    @Transactional(readOnly = true)
    public ParticipantsResponse findParticipantsWithFilter(
            AuthMember authMember, Long studyId, @Nullable Long memberId
    ) {
        Study study = studyRepository.findByIdIfExists(studyId);
        if (Objects.isNull(memberId)) {
            validateEverParticipated(authMember, study);
            return getParticipantsResponseWithoutMemberFilter(study);
        }
        Member member = memberRepository.findByIdIfExists(memberId);
        validateIsSameMemberId(authMember, memberId);
        return getParticipantsResponseWithMemberFilter(study, member);
    }

    private void validateEverParticipated(AuthMember authMember, Study study) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        participantRepository.findByStudyAndMember(study, member)
                .orElseThrow(AuthorizationException::new);
    }

    private ParticipantsResponse getParticipantsResponseWithoutMemberFilter(
            Study study
    ) {
        List<ParticipantResponse> responses =
                participantRepository.findByStudy(study)
                        .stream()
                        .map(ParticipantResponse::from)
                        .toList();
        return ParticipantsResponse.from(responses);
    }

    private ParticipantsResponse getParticipantsResponseWithMemberFilter(
            Study study, Member member
    ) {
        ParticipantResponse response =
                participantRepository.findByStudyAndMember(study, member)
                        .map(ParticipantResponse::from)
                        .orElseThrow(ParticipantNotFoundException::new);
        return ParticipantsResponse.from(List.of(response));
    }

    public Long participateStudy(AuthMember authMember, Long studyId, ParticipateStudyRequest request) {
        Member member = memberRepository.findByIdIfExists(request.memberId());
        validateIsSameMemberId(authMember, request.memberId());
        Study study = studyRepository.findByIdIfExists(studyId);
        Participant participant = new Participant(study, member, request.nickname());
        participant.generateContents(study.getTotalCycle());
        Participant saved = participantRepository.save(participant);
        return saved.getId();
    }

    private void validateIsSameMemberId(AuthMember authMember, Long memberId) {
        if (!(authMember.id().equals(memberId))) {
            throw new AuthorizationException();
        }
    }

    private void validateParticipantIsRelatedWith(
            Participant participant, AuthMember authMember, Study study
    ) {
        validateMemberOwns(participant, authMember);
        validateParticipantIsIncludedIn(study, participant);
    }

    private void validateMemberOwns(Participant participant, AuthMember authMember) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        if (!participant.isOwnedBy(member)) {
            throw new AuthorizationException();
        }
    }

    private void validateParticipantIsIncludedIn(Study study,
            Participant participant) {
        if (participant.isNotIncludedIn(study)) {
            throw new ParticipantNotBelongToStudyException();
        }
    }

    public void deleteParticipant(AuthMember authMember, Long studyId, Long participantId) {
        Study study = studyRepository.findByIdIfExists(studyId);
        validateEverParticipated(authMember, study);
        Participant participant = participantRepository.findByIdIfExists(participantId);
        validateParticipantIsRelatedWith(participant, authMember, study);
        participantRepository.delete(participant);
    }
}
