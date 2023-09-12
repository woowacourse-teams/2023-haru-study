package harustudy.backend.integration;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class PomodoroStudyIntegrationTest extends IntegrationTest {

//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    private EntityManager entityManager;
//
//    private ParticipantCode participantCode1;
//    private ParticipantCode participantCode2;
//    private PomodoroStudy pomodoroStudy1;
//    private PomodoroStudy pomodoroStudy2;
//    private MemberDto memberDto1;
//
//    @BeforeEach
//    void setUp() {
//        super.setMockMvc();
//        participantCode1 = new ParticipantCode(new CodeGenerationStrategy());
//        participantCode2 = new ParticipantCode(new CodeGenerationStrategy());
//        pomodoroStudy1 = new PomodoroStudy("study1", 3, 20, participantCode1);
//        pomodoroStudy2 = new PomodoroStudy("study2", 4, 30, participantCode2);
//        memberDto1 = createMember("member1");
//        PomodoroProgress pomodoroProgress1 = new PomodoroProgress(pomodoroStudy1,
//                memberDto1.member(), "nickname");
//
//        entityManager.persist(participantCode1);
//        entityManager.persist(participantCode2);
//        entityManager.persist(pomodoroStudy1);
//        entityManager.persist(pomodoroStudy2);
//        entityManager.persist(pomodoroProgress1);
//
//        entityManager.flush();
//        entityManager.clear();
//    }
//
//    @Test
//    void 스터디_아이디로_스터디를_조회한다() throws Exception {
//        // given
//        Long studyId = pomodoroStudy1.getId();
//
//        // when
//        MvcResult result = mockMvc.perform(get("/api/studies/{studyId}", studyId)
//                        .accept(MediaType.APPLICATION_JSON)
//                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
//                .andExpect(status().isOk())
//                .andReturn();
//
//        // then
//        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
//        PomodoroStudyResponse response = objectMapper.readValue(jsonResponse,
//                PomodoroStudyResponse.class);
//
//        assertSoftly(softly -> {
//            softly.assertThat(response.studyId()).isEqualTo(pomodoroStudy1.getId());
//            softly.assertThat(response.name()).isEqualTo(pomodoroStudy1.getName());
//            softly.assertThat(response.totalCycle()).isEqualTo(pomodoroStudy1.getTotalCycle());
//            softly.assertThat(response.timePerCycle()).isEqualTo(pomodoroStudy1.getTimePerCycle());
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
//        PomodoroStudyResponse response = objectMapper.readValue(jsonResponse,
//                PomodoroStudyResponse.class);
//        List<PomodoroStudyResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(1);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroStudy1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroStudy1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroStudy1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(pomodoroStudy1.getTimePerCycle());
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
//        PomodoroStudyResponse response = objectMapper.readValue(jsonResponse,
//                PomodoroStudyResponse.class);
//        List<PomodoroStudyResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(1);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroStudy1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroStudy1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroStudy1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(pomodoroStudy1.getTimePerCycle());
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
//        PomodoroStudyResponse response = objectMapper.readValue(jsonResponse,
//                PomodoroStudyResponse.class);
//        List<PomodoroStudyResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(2);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(pomodoroStudy1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(pomodoroStudy1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(pomodoroStudy1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(pomodoroStudy1.getTimePerCycle());
//            softly.assertThat(studies.get(1).studyId()).isEqualTo(pomodoroStudy2.getId());
//            softly.assertThat(studies.get(1).name()).isEqualTo(pomodoroStudy2.getName());
//            softly.assertThat(studies.get(1).totalCycle()).isEqualTo(pomodoroStudy2.getTotalCycle());
//            softly.assertThat(studies.get(1).timePerCycle())
//                    .isEqualTo(pomodoroStudy2.getTimePerCycle());
//        });
//    }
//
//    @Test
//    void 스터디를_개설한다() throws Exception {
//        // given
//        CreatePomodoroStudyRequest request = new CreatePomodoroStudyRequest("studyName", 1, 20);
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
//        CreatePomodoroStudyResponse response = objectMapper.readValue(jsonResponse,
//                CreatePomodoroStudyResponse.class);
//
//        assertThat(response.participantCode())
//                .isAlphabetic()
//                .isUpperCase()
//                .hasSize(6);
//    }
}
