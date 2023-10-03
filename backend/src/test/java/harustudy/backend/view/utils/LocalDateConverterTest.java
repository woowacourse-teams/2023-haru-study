package harustudy.backend.view.utils;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.LocalDate;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator.ReplaceUnderscores;
import org.junit.jupiter.api.Test;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(ReplaceUnderscores.class)
class LocalDateConverterTest {

    @Test
    void startDate를_LocalDateTime으로_변환한다() {
        //given
        LocalDate startDate = LocalDate.of(2023, 7, 27);

        //when
        LocalDateTime result = LocalDateConverter.convertStartDate(startDate);

        //then
        assertThat(result).isEqualTo(LocalDateTime.of(2023, 7, 27, 0, 0, 0, 0));
    }

    @Test
    void endDate를_LocalDateTime으로_변환한다() {
        //given
        LocalDate endDate = LocalDate.of(2023, 7, 27);

        //when
        LocalDateTime result = LocalDateConverter.convertEndDate(endDate);

        //then
        assertThat(result).isEqualTo(LocalDateTime.of(2023, 7, 27, 23, 59, 59, 999999));
    }
}
