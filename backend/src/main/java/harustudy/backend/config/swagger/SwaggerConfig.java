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
import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.HandlerMethod;

@Configuration
public class SwaggerConfig {

    @Bean
    public OperationCustomizer customize() {
        return (Operation operation, HandlerMethod handlerMethod) -> {
            SwaggerExceptionResponse exceptionResponse = handlerMethod.getMethodAnnotation(
                    SwaggerExceptionResponse.class);

            if (!Objects.isNull(exceptionResponse)) {
                Class<? extends HaruStudyException>[] exceptionClasses = exceptionResponse.value();
                ApiResponses responses = operation.getResponses();
                setUpApiResponses(exceptionClasses, responses);
            }
            return operation;
        };
    }

    private void setUpApiResponses(Class<? extends HaruStudyException>[] exceptionClasses,
            ApiResponses responses) {
        Arrays.stream(exceptionClasses)
                .forEach(exceptionClass -> setUpApiResponses(exceptionClass, responses));
    }

    private void setUpApiResponses(Class<? extends HaruStudyException> exceptionClass,
            ApiResponses responses) {
        HaruStudyException exception = extractExceptionFrom(exceptionClass);
        ApiResponse apiResponse = setupApiResponse(exception);
        responses.addApiResponse(removePostfix(exceptionClass), apiResponse);
    }


    private HaruStudyException extractExceptionFrom(
            Class<? extends HaruStudyException> exceptionClass) {
        try {
            Constructor<? extends HaruStudyException> constructor = exceptionClass.getConstructor();
            return constructor.newInstance();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private ApiResponse setupApiResponse(HaruStudyException exception) {
        ObjectSchema objectSchema = setupObjectSchema(exception);
        MediaType mediaType = new MediaType().schema(objectSchema);
        Content content = new Content().addMediaType("application/json", mediaType);

        ExceptionSituation situation = ExceptionMapper.getSituationOf(exception);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setContent(content);
        apiResponse.description(situation.getStatusCode().toString());
        return apiResponse;
    }

    private ObjectSchema setupObjectSchema(HaruStudyException exception) {
        ExceptionSituation situation = ExceptionMapper.getSituationOf(exception);
        ObjectSchema responseObject = new ObjectSchema();
        responseObject.addProperty("message", new StringSchema().example(situation.getMessage()));
        Optional.ofNullable(situation.getErrorCode())
                .ifPresent(code -> responseObject.addProperty("code",
                        new StringSchema().example(code)));
        return responseObject;
    }

    private String removePostfix(Class<? extends HaruStudyException> exceptionClass) {
        String exceptionClassName = exceptionClass.getSimpleName();
        return exceptionClassName.substring(0, exceptionClassName.indexOf("Exception"));
    }
}
