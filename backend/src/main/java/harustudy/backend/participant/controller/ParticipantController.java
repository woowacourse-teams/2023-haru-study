package harustudy.backend.participant.controller;

import harustudy.backend.auth.Authenticated;
import harustudy.backend.auth.dto.AuthMember;
import harustudy.backend.participant.dto.ParticipateStudyRequest;
import harustudy.backend.participant.dto.ParticipantResponse;
import harustudy.backend.participant.dto.ParticipantsResponse;
import harustudy.backend.participant.service.ParticipantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@Tag(name = "진행 관련 기능")
@RequiredArgsConstructor
@RestController
public class ParticipantController {

    private final ParticipantService participantService;

    @Operation(summary = "단일 스터디 참여자 조회")
    @GetMapping("/api/studies/{studyId}/participants/{participantId}")
    public ResponseEntity<ParticipantResponse> findParticipant(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @PathVariable Long participantId
    ) {
        ParticipantResponse response =
                participantService.findParticipant(authMember, studyId, participantId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "필터링 조건으로 참여자 조회")
    @GetMapping("/api/studies/{studyId}/participants")
    public ResponseEntity<ParticipantsResponse> findParticipantsWithFilter(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestParam(required = false) Long memberId
    ) {
        ParticipantsResponse response =
                participantService.findParticipantsWithFilter(authMember, studyId, memberId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "필터링 조건으로 스터디 참여자 조회(임시)")
    @GetMapping("/api/temp/studies/{studyId}/participants")
    public ResponseEntity<ParticipantsResponse> findParticipantsWithFilterTemp(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestParam(required = false) Long memberId
    ) {
        ParticipantsResponse response =
                participantService.tempFindParticipantWithFilter(authMember, studyId, memberId);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "스터디 참여")
    @ApiResponse(responseCode = "201")
    @PostMapping("/api/studies/{studyId}/participants")
    public ResponseEntity<Void> participate(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @RequestBody ParticipateStudyRequest request
    ) {
        Long participantId = participantService.participateStudy(authMember, studyId, request);
        return ResponseEntity.created(
                URI.create("/api/studies/" + studyId + "/participants/" + participantId)).build();
    }

    @Operation(summary = "스터디 참여자 삭제")
    @ApiResponse(responseCode = "204")
    @DeleteMapping("/api/studies/{studyId}/participants/{participantId}")
    public ResponseEntity<Void> delete(
            @Authenticated AuthMember authMember,
            @PathVariable Long studyId,
            @PathVariable Long participantId
    ) {
        participantService.deleteParticipant(authMember, studyId, participantId);
        return ResponseEntity.noContent().build();
    }
}
