package harustudy.backend.acceptance;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.member.repository.MemberRepository;
import harustudy.backend.room.domain.content.PomodoroContent;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.room.domain.progress.PomodoroProgress;
import harustudy.backend.room.domain.progress.PomodoroStatus;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.dto.content.MemberContentResponses;
import harustudy.backend.room.repository.PomodoroRoomRepository;
import harustudy.backend.room.service.ContentService;
import harustudy.backend.room.service.PomodoroRoomService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;
import java.util.Map;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
public class AcceptanceTest {

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private PomodoroRoomRepository pomodoroRoomRepository;

    @Autowired
    private ContentService contentService;

    @Autowired
    private MemberRepository memberRepository;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    @Test
    void 스터디를_진행한다() throws Exception {
        Long 스터디_아이디 = 스터디를_개설한다();
        entityManager.flush();
        entityManager.clear();
        Long 멤버1_아이디 = 스터디에_참여한다(스터디_아이디, "1번멤버");
        Long 멤버2_아이디 = 스터디에_참여한다(스터디_아이디, "2번멤버");
        Long 멤버3_아이디 = 스터디에_참여한다(스터디_아이디, "3번멤버");
        entityManager.flush();
        entityManager.clear();
        스터디_계획을_작성한다(스터디_아이디, 멤버1_아이디);
        entityManager.flush();
        entityManager.clear();
        스터디_상태를_진행에서_회고로_넘긴다(스터디_아이디, 멤버1_아이디);
        entityManager.flush();
        entityManager.clear();
        System.out.println("content 컨텐트 조회 쿼리 시작");
        MemberContentResponses content = contentService.findMemberContent(스터디_아이디, 멤버3_아이디);
        System.out.println("content 컨텐트 조회 쿼리 종료");
        System.out.println("pomodoroContent = " + content.content());
        스터디_회고를_작성한다(스터디_아이디, 멤버1_아이디);
    }

    private Long 스터디를_개설한다() {
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        entityManager.persist(participantCode);
        PomodoroRoom room = new PomodoroRoom("studyName", 3, 20, participantCode);
        entityManager.persist(room);
        return room.getId();
    }

    private Long 스터디에_참여한다(Long roomId, String nickname) {
        // TODO: 스터디 참여 기능 생성되면 대체
        PomodoroRoom pomodoroRoom = entityManager.find(PomodoroRoom.class, roomId);
        Member member = new Member(nickname);
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, 1,
                PomodoroStatus.PLANNING);
        PomodoroContent pomodoroRecord = new PomodoroContent(pomodoroProgress, 1, Map.of(), Map.of());
        entityManager.persist(member);
        entityManager.persist(pomodoroProgress);
        entityManager.persist(pomodoroRecord);
        return member.getId();
    }

    private void 스터디_계획을_작성한다(Long studyId, Long memberId) throws Exception {
        Map<String, String> plan = Map.of("plan", "test");
        String jsonRequest = objectMapper.writeValueAsString(plan);

        mockMvc.perform(post("/api/studies/{studyId}/members/{memberId}/content/plans",
                        studyId, memberId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated());
    }

    private void 스터디_상태를_진행에서_회고로_넘긴다(Long studyId, Long memberId) throws Exception {
        mockMvc.perform(post("/api/studies/{studyId}/members/{memberId}/next-step",
                        studyId, memberId))
                .andExpect(status().isOk());
    }

    private void 스터디_회고를_작성한다(Long studyId, Long memberId) throws Exception {
        Map<String, String> retrospect = Map.of("retrospect", "test");
        String jsonRequest = objectMapper.writeValueAsString(retrospect);

        mockMvc.perform(post("/api/studies/{studyId}/members/{memberId}/content/retrospects",
                        studyId, memberId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonRequest))
                .andExpect(status().isCreated());

        PomodoroRoom pomodoroRoom = pomodoroRoomRepository.findById(studyId).get();
        Member member = memberRepository.findById(memberId).get();
        PomodoroProgress pomodoroProgress = pomodoroRoom.findProgressByMember(member).get();

        List<PomodoroContent> pomodoroContents = pomodoroProgress.getPomodoroContents();
        SoftAssertions.assertSoftly(softly -> {
                    softly.assertThat(pomodoroContents.size()).isOne();
                    softly.assertThat(pomodoroContents.get(0).getPlan())
                            .containsAllEntriesOf(Map.of("plan", "test"));
                    softly.assertThat(pomodoroContents.get(0).getRetrospect())
                            .containsAllEntriesOf(Map.of("retrospect", "test"));
                }
        );
    }
}
