package harustudy.backend.auth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.util.UUID;

@JsonInclude(Include.NON_NULL)
public record TokenResponse(String accessToken, UUID refreshToken) {

}
