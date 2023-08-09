package harustudy.backend.common;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

@Slf4j(topic = "HttpLogger")
@RequiredArgsConstructor
public class LoggingInterceptor implements HandlerInterceptor {

    public static final String HTTP_LOG_FORMAT = """
                                    
            request:
                requestURI: {} {}
                QueryString: {}
                Authorization: {}
                Body: {}
                Handler: {}
            ================
            response:
                statusCode: {}
                Body: {}
                    """;

    private final ObjectMapper objectMapper;

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
            Object handler, Exception ex) throws Exception {
        ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;
        ContentCachingResponseWrapper cachingResponse = (ContentCachingResponseWrapper) response;
        log.info(
                HTTP_LOG_FORMAT,
                request.getMethod(),
                request.getRequestURI(),
                request.getQueryString(),
                request.getHeader("Authorization"),
                objectMapper.readTree(cachingRequest.getContentAsByteArray()),
                handler,

                response.getStatus(),
                objectMapper.readTree(cachingResponse.getContentAsByteArray())
        );
    }
}
