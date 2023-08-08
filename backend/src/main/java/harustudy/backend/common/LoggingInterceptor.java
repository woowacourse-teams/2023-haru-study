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

    private final ObjectMapper objectMapper;

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
            Object handler, Exception ex) throws Exception {
        final ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;
        final ContentCachingResponseWrapper cachingResponse = (ContentCachingResponseWrapper) response;

        log.info(
                """
                        
                        request:
                            requestURI: {} {}
                            QueryString: {}
                            Body: {}
                            Handler: {}
                        ================
                        response:
                            statusCode: {}
                            Body: {}
                                """,
                request.getMethod(),
                request.getRequestURI(),
                request.getQueryString(),
                objectMapper.readTree(cachingRequest.getContentAsByteArray()),
                handler,

                response.getStatus(),
                objectMapper.readTree(cachingResponse.getContentAsByteArray())
        );
    }
}
