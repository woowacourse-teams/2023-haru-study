package harustudy.backend.controller;

import harustudy.backend.service.ProceedPomodoroStudyService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ContentController {

    private final ProceedPomodoroStudyService proceedPomodoroStudyService;

    @PostMapping("/api/studies/{studyId}/members/{memberId}/content/plans")
    public ResponseEntity<Void> writeRetrospect(
            @PathVariable("studyId") Long studyId,
            @PathVariable("memberId") Long memberId,
            @RequestBody Map<String, String> retrospect
    ) {
        proceedPomodoroStudyService.writeRetrospect(studyId, memberId, retrospect);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
