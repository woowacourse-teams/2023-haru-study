package harustudy.backend.service;

import harustudy.backend.dto.response.CurrentCyclePlanResponse;
import harustudy.backend.entity.PomodoroProgress;
import harustudy.backend.repository.MemberProgressRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor
@Transactional
public class MemberProgressService {

    private final MemberProgressRepository<PomodoroProgress> memberProgressRepository;

    public CurrentCyclePlanResponse findByStudyIdWithMemberIdWithCycle(Integer cycle, Long studyId,
            Long memberId) {
        PomodoroProgress pomodoroProgress = memberProgressRepository.findByMemberIdWithStudyId(
                        memberId, studyId)
                .orElseThrow();

        return new CurrentCyclePlanResponse(
                pomodoroProgress.findPomodoroRecordByCycle(cycle).getPlan());
    }
}
