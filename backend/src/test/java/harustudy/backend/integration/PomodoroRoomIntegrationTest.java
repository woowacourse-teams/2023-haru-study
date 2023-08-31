package harustudy.backend.integration;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroRoomIntegrationTest extends IntegrationTest {
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    private EntityManager entityManager;
//
//    private ParticipantCode participantCode1;
//    private ParticipantCode participantCode2;
//    private PomodoroRoom pomodoroRoom1;
//    private PomodoroRoom pomodoroRoom2;
//    private MemberDto memberDto1;
//
//    @BeforeEach
//    void setUp() {
//        super.setMockMvc();
//        participantCode1 = new ParticipantCode(new CodeGenerationStrategy());
//        participantCode2 = new ParticipantCode(new CodeGenerationStrategy());
//        pomodoroRoom1 = new PomodoroRoom("room1", 3, 20, participantCode1);
//        pomodoroRoom2 = new PomodoroRoom("room2", 4, 30, participantCode2);
//        memberDto1 = createMember("member1");
//        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(pomodoroRoom1,
//                memberDto1.member(), "nickname");
//
//        entityManager.persist(participantCode1);
//        entityManager.persist(participantCode2);
//        entityManager.persist(pomodoroRoom1);
//        entityManager.persist(pomodoroRoom2);
//        entityManager.persist(pomodoroProgress1);
//
//        entityManager.flush();
//        entityManager.clear();
//    }
//
//    @Test
//    void 스터디_아이디로_스터디를_조회한다() throws Exception {
//        // given
//        Long roomId = pomodoroRoom1.getId();
//
//        // when
//        MvcResult result = mockMvc.perform(get("/api/studies/{studyId}", roomId)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        // then
//        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
//        PomodoroRoomResponse response = objectMapper.readValue(jsonResponse,
//                PomodoroRoomResponse.class);
//
//        assertSoftly(softly -> {
//            softly.assertThat(response.studyId()).isEqualTo(pomodoroRoom1.getId());
//            softly.assertThat(response.name()).isEqualTo(pomodoroRoom1.getName());
//            softly.assertThat(response.totalCycle()).isEqualTo(pomodoroRoom1.getTotalCycle());
//            softly.assertThat(response.timePerCycle()).isEqualTo(pomodoroRoom1.getTimePerCycle());
//        });
//    }
//
//    @Test
//    void 참여코드로_스터디를_조회한다() throws Exception {
//        // given
//
//        // when
//        MvcResult result = mockMvc.perform(get("/api/studies")
//                        .param("participantCode", participantCode1.getCode())
//                        .accept(MediaType.APPLICATION_JSON)
//                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        // then
//        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
//        PomodoroRoomsResponse response = objectMapper.readValue(jsonResponse,
//                PomodoroRoomsResponse.class);
//        List<PomodoroRoomResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(1);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroRoom1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroRoom1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroRoom1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(pomodoroRoom1.getTimePerCycle());
//        });
//    }
//
//    @Test
//    void 멤버_아이디로_스터디를_조회한다() throws Exception {
//        // given, when
//        MvcResult result = mockMvc.perform(get("/api/studies")
//                        .param("memberId", String.valueOf(memberDto1.member().getId()))
//                        .accept(MediaType.APPLICATION_JSON)
//                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        // then
//        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
//        PomodoroRoomsResponse response = objectMapper.readValue(jsonResponse,
//                PomodoroRoomsResponse.class);
//        List<PomodoroRoomResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(1);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroRoom1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroRoom1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroRoom1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(pomodoroRoom1.getTimePerCycle());
//        });
//    }
//
//    @Test
//    void 모든_스터디를_조회한다() throws Exception {
//        // given, when
//        MvcResult result = mockMvc.perform(get("/api/studies")
//                        .accept(MediaType.APPLICATION_JSON)
//                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        // then
//        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
//        PomodoroRoomsResponse response = objectMapper.readValue(jsonResponse,
//                PomodoroRoomsResponse.class);
//        List<PomodoroRoomResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(2);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroRoom1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroRoom1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroRoom1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(pomodoroRoom1.getTimePerCycle());
//            softly.assertThat(studies.get(1).studyId()).isEqualTo(pomodoroRoom2.getId());
//            softly.assertThat(studies.get(1).name()).isEqualTo(pomodoroRoom2.getName());
//            softly.assertThat(studies.get(1).totalCycle()).isEqualTo(pomodoroRoom2.getTotalCycle());
//            softly.assertThat(studies.get(1).timePerCycle())
//                    .isEqualTo(pomodoroRoom2.getTimePerCycle());
//        });
//    }
//
//    @Test
//    void 스터디를_개설한다() throws Exception {
//        // given
//        CreatePomodoroRoomRequest request = new CreatePomodoroRoomRequest("studyName", 1, 20);
//        String jsonRequest = objectMapper.writeValueAsString(request);
//
//        // when
//        MvcResult result = mockMvc.perform(post("/api/studies")
//                        .content(jsonRequest)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
//                .andExpect(status().isCreated())
//                .andExpect(header().exists("Location"))
//                .andReturn();
//
//        // then
//        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
//        CreatePomodoroRoomResponse response = objectMapper.readValue(jsonResponse,
//                CreatePomodoroRoomResponse.class);
//
//        assertThat(response.participantCode())
//                .isAlphabetic()
//                .isUpperCase()
//                .hasSize(6);
//    }
}
