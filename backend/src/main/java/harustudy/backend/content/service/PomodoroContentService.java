package harustudy.backend.content.service;

import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.auth.exception.AuthorizationException;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.dto.PomodoroContentResponse;
import harustudy.backend.content.dto.PomodoroContentsResponse;
import harustudy.backend.content.dto.WritePlanRequest;
import harustudy.backend.content.dto.WriteRetrospectRequest;
import harustudy.backend.content.exception.PomodoroContentNotFoundException;
import harustudy.backend.content.repository.PomodoroContentRepository;
import harustudy.backend.member.domain.Member;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.exception.PomodoroProgressNotFoundException;
import harustudy.backend.progress.exception.PomodoroProgressStatusException;
import harustudy.backend.progress.exception.ProgressNotBelongToStudyException;
import harustudy.backend.progress.repository.PomodoroProgressRepository;
import harustudy.backend.study.domain.PomodoroStudy;
import harustudy.backend.study.exception.StudyNotFoundException;
import harustudy.backend.study.repository.PomodoroStudyRepository;
import jakarta.annotation.Nullable;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class PomodoroContentService {

    private final PomodoroStudyRepository pomodoroStudyRepository;
    private final MemberRepository memberRepository;
    private final PomodoroProgressRepository pomodoroProgressRepository;
    private final PomodoroContentRepository pomodoroContentRepository;

    public PomodoroContentsResponse findContentsWithFilter(
            AuthMember authMember, Long studyId, Long progressId, @Nullable Integer cycle
    ) {
        List<PomodoroProgress> pomodoroProgresses = getProgressesIfAuthorized(
                authMember, studyId);
        PomodoroProgress pomodoroProgress = filterSingleProgressById(
                pomodoroProgresses, progressId);

        List<PomodoroContent> pomodoroContents = pomodoroProgress.getPomodoroContents();
        if (Objects.isNull(cycle)) {
            return getPomodoroContentsResponseWithoutCycleFilter(pomodoroContents);
        }
        return getPomodoroContentsResponseWithCycleFilter(pomodoroContents, cycle);
    }

    private List<PomodoroProgress> getProgressesIfAuthorized(AuthMember authMember, Long studyId) {
        PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        List<PomodoroProgress> pomodoroProgresses = pomodoroProgressRepository.findAllByPomodoroStudyFetchMember(
                pomodoroStudy);
        Member member = memberRepository.findByIdIfExists(authMember.id());
        if (isProgressNotRelatedToMember(pomodoroProgresses, member)) {
            throw new AuthorizationException();
        }
        return pomodoroProgresses;
    }

    private boolean isProgressNotRelatedToMember(List<PomodoroProgress> pomodoroProgresses,
            Member member) {
        return pomodoroProgresses.stream()
                .noneMatch(pomodoroProgress -> pomodoroProgress.isOwnedBy(member));
    }

    private PomodoroProgress filterSingleProgressById(
            List<PomodoroProgress> pomodoroProgresses, Long progressId) {
        return pomodoroProgresses.stream()
                .filter(progress -> progress.getId().equals(progressId))
                .findFirst()
                .orElseThrow(PomodoroProgressNotFoundException::new);
    }

    private PomodoroContentsResponse getPomodoroContentsResponseWithoutCycleFilter(List<PomodoroContent> pomodoroContents) {
        List<PomodoroContentResponse> pomodoroContentResponses = pomodoroContents.stream()
                .map(PomodoroContentResponse::from)
                .toList();
        return PomodoroContentsResponse.from(pomodoroContentResponses);
    }

    private PomodoroContentsResponse getPomodoroContentsResponseWithCycleFilter(
            List<PomodoroContent> pomodoroContents, Integer cycle) {
        List<PomodoroContentResponse> pomodoroContentResponses = pomodoroContents.stream()
                .filter(content -> content.getCycle().equals(cycle))
                .map(PomodoroContentResponse::from)
                .toList();
        return PomodoroContentsResponse.from(pomodoroContentResponses);
    }

    public void writePlan(AuthMember authMember, Long studyId, WritePlanRequest request) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, request.progressId());
        validateMemberOwnsProgress(member, pomodoroProgress);
        validateProgressIsPlanning(pomodoroProgress);
        PomodoroContent recentContent = findContentWithSameCycle(pomodoroProgress);
        recentContent.changePlan(request.plan());
    }

    private PomodoroProgress findPomodoroProgressFrom(Long studyId, Long progressId) {
        PomodoroStudy pomodoroStudy = pomodoroStudyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        PomodoroProgress pomodoroProgress = pomodoroProgressRepository.findById(progressId)
                .orElseThrow(PomodoroProgressNotFoundException::new);
        validateProgressBelongsToStudy(pomodoroStudy, pomodoroProgress);
        return pomodoroProgress;
    }

    private void validateProgressBelongsToStudy(PomodoroStudy pomodoroStudy, PomodoroProgress pomodoroProgress) {
        if (!pomodoroProgress.isProgressOf(pomodoroStudy)) {
            throw new ProgressNotBelongToStudyException();
        }
    }

    private void validateProgressIsPlanning(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotPlanning()) {
            throw new PomodoroProgressStatusException();
        }
    }

    private PomodoroContent findContentWithSameCycle(PomodoroProgress pomodoroProgress) {
        List<PomodoroContent> pomodoroContents = pomodoroContentRepository.findByPomodoroProgress(
                pomodoroProgress);

        return pomodoroContents.stream()
                .filter(pomodoroContent -> pomodoroContent.hasSameCycleWith(pomodoroProgress))
                .findAny()
                .orElseThrow(PomodoroContentNotFoundException::new);
    }

    public void writeRetrospect(AuthMember authMember, Long studyId, WriteRetrospectRequest request) {
        Member member = memberRepository.findByIdIfExists(authMember.id());
        PomodoroProgress pomodoroProgress = findPomodoroProgressFrom(studyId, request.progressId());
        validateMemberOwnsProgress(member, pomodoroProgress);
        validateProgressIsRetrospect(pomodoroProgress);
        PomodoroContent recentContent = findContentWithSameCycle(pomodoroProgress);
        validateIsPlanFilled(recentContent);

        recentContent.changeRetrospect(request.retrospect());
    }

    private void validateMemberOwnsProgress(Member member, PomodoroProgress pomodoroProgress) {
        if (!pomodoroProgress.isOwnedBy(member)) {
            throw new AuthorizationException();
        }
    }

    private void validateProgressIsRetrospect(PomodoroProgress pomodoroProgress) {
        if (pomodoroProgress.isNotRetrospect()) {
            throw new PomodoroProgressStatusException();
        }
    }

    private void validateIsPlanFilled(PomodoroContent recentContent) {
        if (recentContent.hasEmptyPlan()) {
            throw new PomodoroProgressStatusException();
        }
    }
}
