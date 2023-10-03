package harustudy.backend.view.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

public class LocalDateConverter {

    private static final LocalDateTime DEFAULT_START_DATETIME = LocalDateTime.of(2023, 7, 27, 0, 0, 0, 0);

    private LocalDateConverter() {
    }

    public static LocalDateTime convertStartDate(LocalDate startDate) {
        LocalDateTime converted = DEFAULT_START_DATETIME;
        if (Objects.nonNull(startDate)) {
            converted = startDate.atTime(0, 0, 0, 0);
        }
        return converted;
    }

    public static LocalDateTime convertEndDate(LocalDate endDate) {
        LocalDateTime converted = LocalDateTime.now();
        if (Objects.nonNull(endDate)) {
            converted = endDate.atTime(23, 59, 59, 999999);
        }
        return converted;
    }
}
