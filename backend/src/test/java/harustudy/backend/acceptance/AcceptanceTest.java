package harustudy.backend.acceptance;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.content.domain.PomodoroContent;
import harustudy.backend.content.domain.TemplateVersion;
import harustudy.backend.content.repository.ContentRepository;
import harustudy.backend.member.domain.Member;
import harustudy.backend.participantcode.domain.CodeGenerationStrategy;
import harustudy.backend.participantcode.domain.ParticipantCode;
import harustudy.backend.progress.domain.PomodoroProgress;
import harustudy.backend.progress.domain.PomodoroStatus;
import harustudy.backend.room.domain.PomodoroRoom;
import harustudy.backend.room.domain.Room;
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
    private ContentRepository<PomodoroContent> contentRepository;
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @BeforeEach
    void setUp() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
    }

    // TODO: 통합테스트 의미가 없는 것 같아서, 인수테스트로 전환?
    @Test
    void 스터디를_진행한다() throws Exception {
        Long 스터디_아이디 = 스터디를_개설한다();
        Long 멤버_아이디 = 스터디에_참여한다(스터디_아이디);
        스터디_계획을_작성한다(스터디_아이디, 멤버_아이디);
        스터디_상태를_진행에서_회고로_넘긴다(스터디_아이디, 멤버_아이디);
        스터디_회고를_작성한다(스터디_아이디, 멤버_아이디);
    }

    private Long 스터디를_개설한다() {
        ParticipantCode participantCode = new ParticipantCode(new CodeGenerationStrategy());
        entityManager.persist(participantCode);
        Room room = new PomodoroRoom("studyName", 1, 20, participantCode);
        entityManager.persist(room);
        return room.getId();
    }

    private Long 스터디에_참여한다(Long studyId) {
        // TODO: 스터디 참여 기능 생성되면 대체
        PomodoroRoom pomodoroRoom = entityManager.find(PomodoroRoom.class, studyId);
        Member member = new Member("nickname");
        PomodoroProgress pomodoroProgress = new PomodoroProgress(pomodoroRoom, member, 1,
                PomodoroStatus.PLANNING);
        PomodoroContent pomodoroRecord = new PomodoroContent(pomodoroProgress, 1, Map.of(),
                Map.of(), TemplateVersion.V1);
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
        mockMvc.perform(
                        post("/api/studies/{studyId}/members/{memberId}/next-step",
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

        List<PomodoroContent> pomodoroRecords = contentRepository.findAll();
        SoftAssertions.assertSoftly(softly -> {
                    softly.assertThat(pomodoroRecords.size()).isOne();
                    softly.assertThat(pomodoroRecords.get(0).getPlan())
                            .containsAllEntriesOf(Map.of("plan", "test"));
                    softly.assertThat(pomodoroRecords.get(0).getRetrospect())
                            .containsAllEntriesOf(Map.of("retrospect", "test"));
                }
        );
    }
}
