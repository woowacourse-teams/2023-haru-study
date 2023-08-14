package harustudy.backend.room.controller;

import harustudy.backend.auth.AuthMember;
import harustudy.backend.member.domain.Member;
import harustudy.backend.room.dto.CreatePomodoroRoomRequest;
import harustudy.backend.room.dto.CreatePomodoroRoomResponse;
import harustudy.backend.room.dto.PomodoroRoomResponseV3;
import harustudy.backend.room.dto.PomodoroRoomsResponseV3;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "스터디 관련 기능")
@RequiredArgsConstructor
@RestController
public class PomodoroRoomControllerV3 {

    @Operation(summary = "스터디 정보 조회")
    @GetMapping("/api/v3/studies/{studyId}")
    public ResponseEntity<PomodoroRoomResponseV3> findStudy(
            @PathVariable Long studyId,
            @RequestParam(value = "participantCode", required = false) String participantCode,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "참여한 모든 스터디 조회")
    @GetMapping("/api/v3/studies")
    public ResponseEntity<PomodoroRoomsResponseV3> xx(
            @RequestParam("memberId") Long memberId,
            @AuthMember Member member
    ) {
        return ResponseEntity.ok(null);
    }

    @Operation(summary = "스터디 생성")
    @ApiResponse(responseCode = "201")
    @PostMapping("/api/v3/studies")
    public ResponseEntity<CreatePomodoroRoomResponse> createStudy(
            @Valid @RequestBody CreatePomodoroRoomRequest request,
            @AuthMember Member member
    ) {
        return ResponseEntity.created(URI.create("/api/studies/" + 1L)).body(null);
    }
}
