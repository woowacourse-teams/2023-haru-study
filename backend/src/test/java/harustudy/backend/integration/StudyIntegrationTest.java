package harustudy.backend.integration;

import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class StudyIntegrationTest extends IntegrationTest {
//
//    @Autowired
//    private ObjectMapper objectMapper;
//
//    @Autowired
//    private EntityManager entityManager;
//
//    private ParticipantCode participantCode1;
//    private ParticipantCode participantCode2;
//    private Study study1;
//    private Study study2;
//    private MemberDto memberDto1;
//
//    @BeforeEach
//    void setUp() {
//        super.setMockMvc();
//        participantCode1 = new ParticipantCode(new CodeGenerationStrategy());
//        participantCode2 = new ParticipantCode(new CodeGenerationStrategy());
//        study1 = new Study("study1", 3, 20, participantCode1);
//        study2 = new Study("study2", 4, 30, participantCode2);
//        memberDto1 = createMember("member1");
//        Participant participant1 = new Participant(study1,
//                memberDto1.member(), "nickname");
//
//        entityManager.persist(participantCode1);
//        entityManager.persist(participantCode2);
//        entityManager.persist(study1);
//        entityManager.persist(study2);
//        entityManager.persist(participant1);
//
//        entityManager.flush();
//        entityManager.clear();
//    }
//
//    @Test
//    void 스터디_아이디로_스터디를_조회한다() throws Exception {
//        // given
//        Long studyId = study1.getId();
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
//        StudyResponse response = objectMapper.readValue(jsonResponse,
//                StudyResponse.class);
//
//        assertSoftly(softly -> {
//            softly.assertThat(response.studyId()).isEqualTo(study1.getId());
//            softly.assertThat(response.name()).isEqualTo(study1.getName());
//            softly.assertThat(response.totalCycle()).isEqualTo(study1.getTotalCycle());
//            softly.assertThat(response.timePerCycle()).isEqualTo(study1.getTimePerCycle());
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
//        StudyResponse response = objectMapper.readValue(jsonResponse,
//                StudyResponse.class);
//        List<StudyResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(1);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(study1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(study1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(study1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(study1.getTimePerCycle());
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
//        StudyResponse response = objectMapper.readValue(jsonResponse,
//                StudyResponse.class);
//        List<StudyResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(1);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(study1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(study1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(study1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(study1.getTimePerCycle());
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
//        StudyResponse response = objectMapper.readValue(jsonResponse,
//                StudyResponse.class);
//        List<StudyResponse> studies = response.studies();
//
//        assertSoftly(softly -> {
//            softly.assertThat(studies).hasSize(2);
//            softly.assertThat(studies.get(0).studyId()).isEqualTo(study1.getId());
//            softly.assertThat(studies.get(0).name()).isEqualTo(study1.getName());
//            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(study1.getTotalCycle());
//            softly.assertThat(studies.get(0).timePerCycle())
//                    .isEqualTo(study1.getTimePerCycle());
//            softly.assertThat(studies.get(1).studyId()).isEqualTo(study2.getId());
//            softly.assertThat(studies.get(1).name()).isEqualTo(study2.getName());
//            softly.assertThat(studies.get(1).totalCycle()).isEqualTo(study2.getTotalCycle());
//            softly.assertThat(studies.get(1).timePerCycle())
//                    .isEqualTo(study2.getTimePerCycle());
//        });
//    }
//
//    @Test
//    void 스터디를_개설한다() throws Exception {
//        // given
//        CreateStudyRequest request = new CreateStudyRequest("studyName", 1, 20);
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
//        CreateStudyResponse response = objectMapper.readValue(jsonResponse,
//                CreateStudyResponse.class);
//
//        assertThat(response.participantCode())
//                .isAlphabetic()
//                .isUpperCase()
//                .hasSize(6);
//    }
}
