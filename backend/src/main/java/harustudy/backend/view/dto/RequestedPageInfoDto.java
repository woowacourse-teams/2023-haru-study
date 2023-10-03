package harustudy.backend.view.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

public record RequestedPageInfoDto(Integer page, Integer size, LocalDateTime startDate, LocalDateTime endDate) {

    private static final LocalDateTime DEFAULT_START_DATETIME = LocalDateTime.of(2023, 7, 27, 0, 0, 0, 0);

    public static RequestedPageInfoDto of(Integer page, Integer size, LocalDate startDate, LocalDate endDate) {
        return new RequestedPageInfoDto(
                page,
                size,
                convertStartDate(startDate),
                convertEndDate(endDate)
        );
    }

    private static LocalDateTime convertStartDate(LocalDate startDate) {
        LocalDateTime converted = DEFAULT_START_DATETIME;
        if (Objects.nonNull(startDate)) {
            converted = startDate.atTime(0, 0, 0, 0);
        }
        return converted;
    }

    private static LocalDateTime convertEndDate(LocalDate endDate) {
        LocalDateTime converted = LocalDateTime.now();
        if (Objects.nonNull(endDate)) {
            converted = endDate.atTime(23, 59, 59, 999999);
        }
        return converted;
    }
}
