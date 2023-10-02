package harustudy.backend.view.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.view.dto.CalenderStudyRecordsResponse;
import harustudy.backend.view.dto.StudyRecordResponse;
import harustudy.backend.view.service.ViewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "view 전용 조회 관련 기능")
@RequiredArgsConstructor
@RestController
public class ViewController {

    private final ViewService viewService;

    @Operation(summary = "스터디 기록 페이지 조회")
    @GetMapping("/api/view/study-records")
    public ResponseEntity<StudyRecordResponse> findStudyRecordsPage(
            @Authenticated AuthMember authMember,
            @RequestParam Long page,
            @RequestParam Long size,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate endDate
    ) {
        viewService.findStudyRecordsPage(authMember, page, size, startDate, endDate);
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "달력 기반 스터디 기록 조회")
    @GetMapping("/api/view/calender/study-records")
    public ResponseEntity<CalenderStudyRecordsResponse> findCalenderStudyRecords() {
        return ResponseEntity.ok(CalenderStudyRecordsResponse.of());
    }
}
