package harustudy.backend.config.swagger;

import harustudy.backend.common.ExceptionMapper;
import harustudy.backend.common.ExceptionSituation;
import harustudy.backend.common.HaruStudyException;
import harustudy.backend.common.SwaggerExceptionResponse;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.media.Content;
import io.swagger.v3.oas.models.media.MediaType;
import io.swagger.v3.oas.models.media.ObjectSchema;
import io.swagger.v3.oas.models.media.StringSchema;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import java.lang.reflect.Constructor;
import java.util.Objects;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;

@Configuration
public class SwaggerConfig {

    @Bean
    public OperationCustomizer customizer() {
        return (Operation operation, HandlerMethod handlerMethod) -> {
            SwaggerExceptionResponse exceptionResponse = handlerMethod.getMethodAnnotation(
                    SwaggerExceptionResponse.class);

            if (!Objects.isNull(exceptionResponse)) {
                try {
                    generateErrorCodeResponse(operation, exceptionResponse.value());
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }
            return operation;
        };
    }

    private void generateErrorCodeResponse(Operation operation,
            Class<? extends HaruStudyException> type) throws Exception {
        ApiResponses responses = operation.getResponses();
        Constructor<? extends HaruStudyException> constructor = type.getConstructor();
        ExceptionSituation situation = ExceptionMapper.getSituationOf(constructor.newInstance());
        ObjectSchema responseObject = new ObjectSchema();
        responseObject.addProperty("message", new StringSchema().example(situation.getMessage()));
        responseObject.addProperty("code", new StringSchema().example(situation.getErrorCode()));

        addExampleToResponse(responses, situation, responseObject);
    }

    private void addExampleToResponse(ApiResponses responses, ExceptionSituation situation,
            ObjectSchema objectSchema) {

        Content content = new Content();
        MediaType mediaType = new MediaType();
        ApiResponse apiResponse = new ApiResponse();

        content.addMediaType("application/json", mediaType);
        mediaType.schema(objectSchema);
        apiResponse.setContent(content);
        responses.addApiResponse(situation.getStatusCode().toString(), apiResponse);
    }
}
