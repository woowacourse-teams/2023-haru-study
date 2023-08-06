package harustudy.backend.common;

import static org.assertj.core.api.Assertions.assertThat;

import harustudy.backend.member.exception.MemberNotParticipatedException;
import org.junit.jupiter.api.DisplayNameGeneration;
import org.junit.jupiter.api.DisplayNameGenerator;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

@SuppressWarnings("NonAsciiCharacters")
@DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
class ExceptionMapperTest {

    @Test
    void 해당하는_예외에_맞는_정보를_반환할_수_있다() {
        // given
        MemberNotParticipatedException exception = new MemberNotParticipatedException();

        // when
        ExceptionSituation exceptionSituation = ExceptionMapper.getSituationOf(exception);

        // then
        assertThat(exceptionSituation.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        assertThat(exceptionSituation.getErrorCode()).isEqualTo(1000);
        assertThat(exceptionSituation.getMessage()).isEqualTo("멤버가 해당 스터디에 참여하지 않았습니다.");
    }
}
