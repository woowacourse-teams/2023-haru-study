package harustudy.backend.content.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.content.domain.Content;
import harustudy.backend.content.dto.ContentResponse;
import harustudy.backend.content.dto.ContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.content.exception.ContentNotFoundException;
import harustudy.backend.content.repository.ContentRepository;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.exception.ParticipantNotFoundException;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;

@RequiredArgsConstructor
@Transactional
@Service
public class ContentService {

    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;
    private final ParticipantRepository participantRepository;
    private final ContentRepository contentRepository;

    @Transactional(readOnly = true)
    public ContentsResponse findContentsWithFilter(AuthMember authMember, Long studyId,
                                                   Long participantId, Integer cycle) {
        Study study = studyRepository.findByIdIfExists(studyId);
        List<Participant> participants = participantRepository.findByStudy(study);
        Member member = memberRepository.findByIdIfExists(authMember.id());

        validateMemberIncludedIn(participants, member);
        Participant participant = findParticipantById(participants, participantId);

        return getContentsResponseByCycleFilter(cycle, participant);
    }

    private static Participant findParticipantById(List<Participant> participants, Long participantId) {
        return participants.stream()
                .filter(participant -> participant.isSameId(participantId))
                .findFirst()
                .orElseThrow(ParticipantNotFoundException::new);
    }

    private List<Participant> validateMemberIncludedIn(List<Participant> participants, Member member) {
        if (isMemberIncludedInParticipants(member, participants)) {
            throw new AuthorizationException();
        }
        return participants;
    }

    private static boolean isMemberIncludedInParticipants(Member member, List<Participant> participants) {
        return participants.stream()
                .noneMatch(participant -> participant.isCreatedBy(member));
    }

    private ContentsResponse getContentsResponseByCycleFilter(Integer cycle, Participant participant) {
        List<Content> contents = participant.getContents();
        if (Objects.isNull(cycle)) {
            return getContentsResponseWithoutCycleFilter(contents);
        }
        return getContentsResponseWithCycleFilter(contents, cycle);
    }

    private ContentsResponse getContentsResponseWithoutCycleFilter(List<Content> contents) {
        List<ContentResponse> contentResponses = contents.stream()
                .map(ContentResponse::from)
                .toList();
        return ContentsResponse.from(contentResponses);
    }

    private ContentsResponse getContentsResponseWithCycleFilter(List<Content> contents, Integer cycle) {
        List<ContentResponse> contentResponses = contents.stream()
                .filter(content -> content.getCycle().equals(cycle))
                .map(ContentResponse::from)
                .toList();
        return ContentsResponse.from(contentResponses);
    }

    public void writePlan(AuthMember authMember, Long studyId, WritePlanRequest request) {
        Study study = studyRepository.findByIdIfExists(studyId);
        Participant participant = participantRepository.findByIdIfExists(request.participantId());
        Member member = memberRepository.findByIdIfExists(authMember.id());

        participant.validateIsBelongsTo(study);
        participant.validateIsCreatedByMember(member);
        study.validateIsPlanning();

        Content recentContent = findContentWithSameCycle(study, participant);
        recentContent.changePlan(request.plan());
    }

    public void writeRetrospect(AuthMember authMember, Long studyId, WriteRetrospectRequest request) {
        Study study = studyRepository.findByIdIfExists(studyId);
        Participant participant = participantRepository.findByIdIfExists(request.participantId());
        Member member = memberRepository.findByIdIfExists(authMember.id());

        participant.validateIsBelongsTo(study);
        participant.validateIsCreatedByMember(member);
        study.validateIsRetrospect();

        Content recentContent = findContentWithSameCycle(study, participant);
        recentContent.changeRetrospect(request.retrospect());
    }

    private Content findContentWithSameCycle(Study study, Participant participant) {
        List<Content> contents = contentRepository.findByParticipant(participant);

        return contents.stream()
                .filter(content -> content.hasSameCycleWith(study))
                .findAny()
                .orElseThrow(ContentNotFoundException::new);
    }
}
