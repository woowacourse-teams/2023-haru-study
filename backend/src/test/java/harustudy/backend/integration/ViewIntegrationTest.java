package harustudy.backend.integration;

import harustudy.backend.participant.domain.Participant;
import harustudy.backend.study.domain.Study;
import harustudy.backend.testutils.EntityManagerUtil;
import harustudy.backend.view.dto.StudyRecordsPageResponse;
import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Map.Entry;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import static org.assertj.core.api.SoftAssertions.assertSoftly;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
public class ViewIntegrationTest extends IntegrationTest {

    private MemberDto memberDto;

    @BeforeEach
    void setUp() {
        super.setUp();
        memberDto = createMember("member");
        setUpWithNativeQuery();
        EntityManagerUtil.flushAndClearContext(entityManager);
    }

    private void setUpWithNativeQuery() {
        LocalDateTime dateTime = LocalDateTime.of(2023, 10, 2, 18,0,0);
        for(int i=0; i<10; i++) {
            Study study1 = new Study("name", 1, 20);
            Study study2 = new Study("name", 1, 20);
            entityManager.persist(study1);
            entityManager.persist(study2);

            entityManager.createQuery("update Study set createdDate = :createdDate where id = :id")
                    .setParameter("createdDate", dateTime)
                    .setParameter("id", study1.getId())
                    .executeUpdate();
            entityManager.createQuery("update Study set createdDate = :createdDate where id = :id")
                    .setParameter("createdDate", dateTime.minusHours(1L))
                    .setParameter("id", study2.getId())
                    .executeUpdate();

            entityManager.persist(Participant.of(study1,
                    memberDto.member(), "nickname"));
            entityManager.persist(Participant.of(study2,
                    memberDto.member(), "nickname"));

            dateTime = dateTime.minusDays(1L);
        }
    }

    @Test
    void 날짜_범위를_기준으로_멤버의_스터디_기록을_페이지_조회할_수_있다() throws Exception {
        //given
        Integer page = 0;
        Integer size = 5;
        String sortColumn = "createdDate";
        LocalDate startDate = LocalDate.of(2023, 9, 20);
        LocalDate endDate = LocalDate.of(2023, 10, 10);

        Map<String, String> params = Map.of(
                "memberId", String.valueOf(memberDto.member().getId()),
                "page", String.valueOf(page),
                "size", String.valueOf(size),
                "sort", sortColumn,
                "startDate", startDate.toString(),
                "endDate", endDate.toString()
        );
        MultiValueMap<String, String> queryParams = createQueryParams(params);

        //when
        MvcResult mvcResult = mockMvc.perform(get("/api/v2/view/study-records")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        //then
        String jsonResponse = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        StudyRecordsPageResponse response = objectMapper.readValue(jsonResponse, StudyRecordsPageResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.studyRecords().size()).isEqualTo(5);
            softly.assertThat(response.pageInfo().pageNum()).isEqualTo(0);
            softly.assertThat(response.pageInfo().totalPages()).isEqualTo(4);
        });
    }

    @Test
    void 날짜_범위가_없다면_멤버의_전체_스터디_기록을_페이지_조회할_수_있다() throws Exception {
        //given
        Integer page = 0;
        Integer size = 5;
        String sortColumn = "createdDate";

        Map<String, String> params = Map.of(
                "memberId", String.valueOf(memberDto.member().getId()),
                "page", String.valueOf(page),
                "size", String.valueOf(size),
                "sort", sortColumn
        );
        MultiValueMap<String, String> queryParams = createQueryParams(params);

        //when
        MvcResult mvcResult = mockMvc.perform(get("/api/v2/view/study-records")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk())
                .andReturn();

        //then
        String jsonResponse = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
        StudyRecordsPageResponse response = objectMapper.readValue(jsonResponse, StudyRecordsPageResponse.class);

        assertSoftly(softly -> {
            softly.assertThat(response.studyRecords().size()).isEqualTo(5);
            softly.assertThat(response.pageInfo().pageNum()).isEqualTo(0);
            softly.assertThat(response.pageInfo().totalPages()).isEqualTo(4);
        });
    }

    @Test
    void 달력_기반으로_멤버의_스터디_기록을_조회할_수_있다() throws Exception {
        //given, when
        LocalDate startDate = LocalDate.of(2023, 9, 20);
        LocalDate endDate = LocalDate.of(2023, 10, 10);

        Map<String, String> params = Map.of(
                "memberId", String.valueOf(memberDto.member().getId()),
                "startDate", startDate.toString(),
                "endDate", endDate.toString()
        );
        MultiValueMap<String, String> queryParams = createQueryParams(params);

        //then
        mockMvc.perform(get("/api/v2/view/calendar/study-records")
                        .params(queryParams)
                        .accept(MediaType.APPLICATION_JSON)
                        .header(HttpHeaders.AUTHORIZATION, memberDto.createAuthorizationHeader()))
                .andExpect(status().isOk());
    }

    private MultiValueMap<String, String> createQueryParams(Map<String, String> params) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        for (Entry<String, String> entry : params.entrySet()) {
            queryParams.add(entry.getKey(), entry.getValue());
        }
        return queryParams;
    }
}
