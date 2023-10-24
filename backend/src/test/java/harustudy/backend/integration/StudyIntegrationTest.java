package harustudy.backend.integration;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import harustudy.backend.participant.domain.Participant;
import harustudy.backend.participant.domain.Step;
import harustudy.backend.study.domain.Study;
import harustudy.backend.study.dto.CreateStudyRequest;
import harustudy.backend.study.dto.StudiesResponse;
import harustudy.backend.study.dto.StudyResponse;
import harustudy.backend.testutils.EntityManagerUtil;
import jakarta.persistence.EntityManager;
import java.nio.charset.StandardCharsets;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.assertj.core.api.SoftAssertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class StudyIntegrationTest extends IntegrationTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private EntityManager entityManager;

    private Study study1;
    private Study study2;
    private MemberDto memberDto1;

    @BeforeEach
    void setUp() {
        super.setMockMvc();
        study1 = new Study("study1", 3, 20);
        study2 = new Study("study2", 4, 30);
        memberDto1 = createMember("member1");
        Participant participant1 = Participant.of(study1, memberDto1.member(), "nickname");
        entityManager.persist(study1);
        entityManager.persist(study2);
        entityManager.persist(participant1);
        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    @Test
    void 스터디_아이디로_스터디를_조회한다() throws Exception {
        // given
        Long studyId = study1.getId();

        // when
        MvcResult result = mockMvc.perform(get("/api/v2/studies/{studyId}", studyId)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        StudyResponse response = objectMapper.readValue(jsonResponse,
                StudyResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.studyId()).isEqualTo(study1.getId());
            softly.assertThat(response.name()).isEqualTo(study1.getName());
            softly.assertThat(response.totalCycle()).isEqualTo(study1.getTotalCycle());
            softly.assertThat(response.timePerCycle()).isEqualTo(study1.getTimePerCycle());
            softly.assertThat(response.currentCycle()).isEqualTo(study1.getCurrentCycle());
            softly.assertThat(response.studyStep()).isEqualTo(StudyResponse.from(study1).studyStep());
            softly.assertThat(response.progressStep()).isEqualTo(StudyResponse.from(study1).progressStep());
        });
    }

//    @Test
//    void 참여코드로_스터디를_조회한다() throws Exception {
//        // given
//
//        // when
//        MvcResult result = mockMvc.perform(get("/api/v2/studies")
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
//
//        assertSoftly(softly -> {
//            softly.assertThat(response.studyId()).isEqualTo(study1.getId());
//            softly.assertThat(response.name()).isEqualTo(study1.getName());
//            softly.assertThat(response.totalCycle()).isEqualTo(study1.getTotalCycle());
//            softly.assertThat(response.timePerCycle()).isEqualTo(study1.getTimePerCycle());
//            softly.assertThat(response.currentCycle()).isEqualTo(study1.getCurrentCycle());
//            softly.assertThat(response.studyStep()).isEqualTo(study1.getStep().name().toLowerCase());
//            softly.assertThat(response.progress()).isEqualTo(study1.getStep().name().toLowerCase());
//        });
//    }

/*    @Test
    void 멤버_아이디로_스터디를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(get("/api/v2/studies")
                        .param("memberId", String.valueOf(memberDto1.member().getId()))
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        StudyResponse response = objectMapper.readValue(jsonResponse, StudyResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.studyId()).isEqualTo(study1.getId());
            softly.assertThat(response.name()).isEqualTo(study1.getName());
            softly.assertThat(response.totalCycle()).isEqualTo(study1.getTotalCycle());
            softly.assertThat(response.timePerCycle()).isEqualTo(study1.getTimePerCycle());
            softly.assertThat(response.currentCycle()).isEqualTo(study1.getCurrentCycle());
            softly.assertThat(response.studyStep()).isEqualTo(study1.getStep().name().toLowerCase());
            softly.assertThat(response.progress()).isEqualTo(study1.getStep().name().toLowerCase());
        });
    }*/

    @Test
    void 모든_스터디를_조회한다() throws Exception {
        // given, when
        MvcResult result = mockMvc.perform(get("/api/v2/studies")
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        // then
        String jsonResponse = result.getResponse().getContentAsString(StandardCharsets.UTF_8);
        StudiesResponse response = objectMapper.readValue(jsonResponse, StudiesResponse.class);
        List<StudyResponse> studies = response.studies();

        assertSoftly(softly -> {
            softly.assertThat(studies).hasSize(2);
            softly.assertThat(studies.get(0).studyId()).isEqualTo(study1.getId());
            softly.assertThat(studies.get(0).name()).isEqualTo(study1.getName());
            softly.assertThat(studies.get(0).totalCycle()).isEqualTo(study1.getTotalCycle());
            softly.assertThat(studies.get(0).timePerCycle())
                    .isEqualTo(study1.getTimePerCycle());
            softly.assertThat(studies.get(1).studyId()).isEqualTo(study2.getId());
            softly.assertThat(studies.get(1).name()).isEqualTo(study2.getName());
            softly.assertThat(studies.get(1).totalCycle()).isEqualTo(study2.getTotalCycle());
            softly.assertThat(studies.get(1).timePerCycle())
                    .isEqualTo(study2.getTimePerCycle());
        });
    }

    @Disabled("무중단 배포를 위한 API 버저닝으로 인한 임시 disabled")
    @Test
    void 스터디를_개설한다() throws Exception {
        // given
        CreateStudyRequest request = new CreateStudyRequest("studyName", 1, 20);
        String jsonRequest = objectMapper.writeValueAsString(request);

        // when
        MvcResult result = mockMvc.perform(post("/api/v2/studies")
                        .content(jsonRequest)
                        .contentType(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andReturn();

        // then
        String location = result.getResponse().getHeader("Location");
        SoftAssertions.assertSoftly(softly -> {
            Assertions.assertThat(location).isNotNull();
            Assertions.assertThat(location.split("/")).hasSize(4);
        });
    }

    @Test
    void studyId로_스터디를_진행시킨다() throws Exception {
        // when, then
        mockMvc.perform(
                        post("/api/v2/studies/{studyId}/next-step",
                                study1.getId())
                                .contentType(MediaType.APPLICATION_JSON)
                                .header(HttpHeaders.AUTHORIZATION, memberDto1.createAuthorizationHeader()))
                .andExpect(status().isNoContent());

        Study foundStudy = entityManager.find(Study.class, study1.getId());
        assertThat(foundStudy.getStep()).isEqualTo(Step.PLANNING);
    }
}
