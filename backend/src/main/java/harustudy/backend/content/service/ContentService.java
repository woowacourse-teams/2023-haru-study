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
import harustudy.backend.participant.domain.Step;
import harustudy.backend.participant.exception.ParticipantNotFoundException;
import harustudy.backend.participant.exception.StudyStepException;
import harustudy.backend.participant.exception.ParticipantNotBelongToStudyException;
import harustudy.backend.participant.repository.ParticipantRepository;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.exception.StudyNotFoundException;
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
public class ContentService {

    private final StudyRepository studyRepository;
    private final MemberRepository memberRepository;
    private final ParticipantRepository participantRepository;
    private final ContentRepository contentRepository;

    @Transactional(readOnly = true)
    public ContentsResponse findContentsWithFilter(
            AuthMember authMember, Long studyId, Long participantId, @Nullable Integer cycle
    ) {
        List<Participant> participants = getParticipantsIfAuthorized(
                authMember, studyId);
        Participant participant = filterSingleParticipantById(
                participants, participantId);

        List<Content> contents = participant.getContents();
        if (Objects.isNull(cycle)) {
            return getContentsResponseWithoutCycleFilter(contents);
        }
        return getContentsResponseWithCycleFilter(contents, cycle);
    }

    private List<Participant> getParticipantsIfAuthorized(AuthMember authMember, Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        List<Participant> participants = participantRepository.findAllByStudyFetchMember(
                study);
        Member member = memberRepository.findByIdIfExists(authMember.id());
        if (isParticipantNotRelatedToMember(participants, member)) {
            throw new AuthorizationException();
        }
        return participants;
    }

    private boolean isParticipantNotRelatedToMember(List<Participant> participants,
            Member member) {
        return participants.stream()
                .noneMatch(participant -> participant.isOwnedBy(member));
    }

    private Participant filterSingleParticipantById(
            List<Participant> participants, Long participantId) {
        return participants.stream()
                .filter(participant -> participant.getId().equals(participantId))
                .findFirst()
                .orElseThrow(ParticipantNotFoundException::new);
    }

    private ContentsResponse getContentsResponseWithoutCycleFilter(List<Content> contents) {
        List<ContentResponse> contentResponses = contents.stream()
                .map(ContentResponse::from)
                .toList();
        return ContentsResponse.from(contentResponses);
    }

    private ContentsResponse getContentsResponseWithCycleFilter(
            List<Content> contents, Integer cycle) {
        List<ContentResponse> contentResponses = contents.stream()
                .filter(content -> content.getCycle().equals(cycle))
                .map(ContentResponse::from)
                .toList();
        return ContentsResponse.from(contentResponses);
    }

    public void writePlan(AuthMember authMember, Long studyId, WritePlanRequest request) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        Study study = studyRepository.findByIdIfExists(studyId);
        Participant participant = participantRepository.findByIdIfExists(request.participantId());

        validateParticipantBelongsToStudy(study, participant);
        validateMemberOwnsParticipant(member, participant);
        validateStudyIsPlanning(study);

        Content recentContent = findContentWithSameCycle(study, participant);
        recentContent.changePlan(request.plan());
    }

    private void validateParticipantBelongsToStudy(Study study, Participant participant) {
        if (!participant.isParticipantOf(study)) {
            throw new ParticipantNotBelongToStudyException();
        }
    }

    private void validateStudyIsPlanning(Study study) {
        if (!study.isStep(Step.PLANNING)) {
            throw new StudyStepException();
        }
    }

    private Content findContentWithSameCycle(Study study, Participant participant) {
        List<Content> contents = contentRepository.findByParticipant(
                participant);

        return contents.stream()
                .filter(content -> content.hasSameCycleWith(study))
                .findAny()
                .orElseThrow(ContentNotFoundException::new);
    }

    public void writeRetrospect(AuthMember authMember, Long studyId, WriteRetrospectRequest request) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        Study study = studyRepository.findByIdIfExists(studyId);
        Participant participant = participantRepository.findByIdIfExists(request.participantId());

        validateParticipantBelongsToStudy(study, participant);
        validateMemberOwnsParticipant(member, participant);
        validateStudyIsRetrospect(study);

        Content recentContent = findContentWithSameCycle(study, participant);
        validateIsPlanFilled(recentContent);

        recentContent.changeRetrospect(request.retrospect());
    }

    private void validateMemberOwnsParticipant(Member member, Participant participant) {
        if (!participant.isOwnedBy(member)) {
            throw new AuthorizationException();
        }
    }

    private void validateStudyIsRetrospect(Study study) {
        if (!study.isStep(Step.RETROSPECT)) {
            throw new StudyStepException();
        }
    }

    private void validateIsPlanFilled(Content recentContent) {
        if (!recentContent.isPlanWritten()) {
            throw new StudyStepException();
        }
    }
}
